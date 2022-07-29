export const urls = {
    login: "/",
    signup:"/signup",
    logout:"/logout",
    dashboard:"/dashboard",
    profile:"/profile",
    updatePassword:"/updatePassword",
    todoAdd:"/todoAdd",
    todoComplete:"/todoComplete",
    todoDelete:"/todoDelete",
}

export const pages = {
    login: "login",
    signup:"signup",
    dashboard:"dashboard",
    profile:"profile",
    updatePassword:"updatePassword",
    error:"error",
    [404]:"404",
}


export const titles = {
    login_page_title: "ToDo APP | Login",
    signup_page_title:"ToDo APP | Signup",
    dashboard_page_title:"ToDo APP | Dashboard",
    profile_page_title:"ToDo APP | Profile",
    password_page_title:"ToDo APP | Update Password",
}

export const success = {
    signup_success: "Signup Successfully",
    update_success: "Record Updated Successfully",
    add_success: "Added Successfully",
    complete_success: "Completed Successfully",
    delete_success: "Deleted Successfully",
}

export const errors = {
    server_error: "Internal server error. Please try again later",
    app_error: "Internal Server Error",
    expectation_error: "Expectation Failed",
    signin_error: "Invalid Username or Password",
    signup_error: "Username already exists",
    session_error: "Your session has timed out",
}