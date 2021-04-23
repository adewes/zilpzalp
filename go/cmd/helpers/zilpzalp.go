// Zilp-Zalp - Privacy-Friendly Contact Tracing
// Copyright (C) 2021-2021 The Zilp-Zalp Authors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

package helpers

import (
	"github.com/adewes/zilpzalp/go"
	zzHelpers "github.com/adewes/zilpzalp/go/helpers"
	"github.com/urfave/cli"
	"os"
)

type decorator func(f func(c *cli.Context) error) func(c *cli.Context) error

func decorate(commands []cli.Command, decorator decorator) []cli.Command {
	newCommands := make([]cli.Command, len(commands))
	for i, command := range commands {
		if command.Action != nil {
			command.Action = decorator(command.Action.(func(c *cli.Context) error))
		}
		if command.Subcommands != nil {
			command.Subcommands = decorate(command.Subcommands, decorator)
		}
		newCommands[i] = command
	}
	return newCommands
}

var defaultSettings = map[string]interface{}{}

func Settings() (zilpzalp.Settings, error) {
	settingsPaths := zzHelpers.SettingsPaths()
	if settings, err := zzHelpers.Settings(settingsPaths); err != nil {
		return nil, err
	} else {
		// if no settings were given we use the default settings above
		if len(settingsPaths) == 0 {
			settings.Update(defaultSettings)
		}
		return settings, nil
	}
}

func ZilpZalp(definitions *zilpzalp.Definitions) {

	//var controller zilpzalp.Controller

	var err error
	
	/*
	var settings zilpzalp.Settings

	if settings, err = Settings(); err != nil {
		zilpzalp.Log.Fatal(err)
	}

	*/

	init := func(f func(c *cli.Context) error) func(c *cli.Context) error {
		return func(c *cli.Context) error {

			level := c.GlobalString("level")
			logLevel, err := zilpzalp.ParseLevel(level)
			if err != nil {
				return err
			}
			zilpzalp.Log.SetLevel(logLevel)

			runner := func() error { return f(c) }
			profiler := c.GlobalString("profile")
			if profiler != "" {
				return runWithProfiler(profiler, runner)
			}

			return f(c)
		}
	}

	app := cli.NewApp()
	app.Name = "Zilp-Zalp"
	app.Usage = "Run all Zilp-Zalp commands"
	app.Flags = []cli.Flag{
		cli.StringFlag{
			Name:  "level",
			Value: "info",
			Usage: "The desired log level",
		},
		cli.StringFlag{
			Name:  "profile",
			Value: "",
			Usage: "enable profiler and store results to given filename",
		},
	}

	bareCommands := []cli.Command{}
	app.Commands = decorate(bareCommands, init)

	err = app.Run(os.Args)

	if err != nil {
		zilpzalp.Log.Error(err)
	}

}
