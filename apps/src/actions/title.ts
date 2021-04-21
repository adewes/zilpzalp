import Base from "./base";

export default class Title extends Base {
    static get defaultKey() {
        return "title";
    }

    setTitle(title: string) {
        const oldTitle = this.get();
        if (title instanceof Array)
            title = title.join(" ")
        if (!(typeof title === 'string') && !(title instanceof String)){
            return
        }
        if (oldTitle === title) return;
        this.set(title);
        document.title = `${title} · Zilp-Zalp`;
    }
}
