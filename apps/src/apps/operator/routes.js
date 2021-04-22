import Setup from "./setup";
import t from "./translations.yml";

const routes = new Map([
    [
        "setup",
        {
            url: "/?",
            handler: () => ({
                t: t,
                title: "setup",
                component: Setup,
                props: {},
            })
        }
    ],
]);

export default routes;
