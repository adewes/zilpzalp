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
	"github.com/kiprotect/go-helpers/settings"
	"github.com/adewes/zilpzalp/go"
	"os"
	"path/filepath"
	"strings"
)

var EnvAssetsName = "ZILPZALP_ASSETS"
var EnvSettingsName = "ZILPZALP_SETTINGS"

func AssetsPaths() []string {
	envValue := os.Getenv(EnvAssetsName)
	if envValue == "" {
		wd, err := os.Getwd()
		if err != nil {
			return []string{}
		}
		return []string{filepath.Join(wd, "assets")}
	}
	return strings.Split(envValue, ":")
}

func SettingsPaths() []string {
	envValue := os.Getenv(EnvSettingsName)
	if envValue == "" {
		return []string{}
	}
	values := strings.Split(envValue, ":")
	sanitizedValues := make([]string, 0, len(values))
	for _, value := range values {
		if value == "" {
			continue
		}
		sanitizedValues = append(sanitizedValues, value)
	}
	return sanitizedValues
}

func Settings(settingsPaths []string) (zilpzalp.Settings, error) {
	return settings.MakeSettings(settingsPaths)
}
