import Dashboard from "./dashboard";
import t from "./translations.yml";

const routes = new Map([
    [
        "dashboard",
        {
            url: "/?(?:hd)?(?:/)?",
            handler: () => ({
                t: t,
                title: "dashboard",
                component: Dashboard,
                props: {},
            })
        }
    ],
]);

export default routes;
