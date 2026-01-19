export default class User {
    public static GetUserName() {
        if (typeof window !== "undefined")
            return localStorage.getItem("name")
        // return "Helo "
    }
}