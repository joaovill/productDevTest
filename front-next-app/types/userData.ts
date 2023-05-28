interface userData {
    id?: string;
    username: string;
    name: string;
}

interface fetchUser {
    username: string;
    password: string;
}

interface registerUser extends fetchUser {
    name: string;
}