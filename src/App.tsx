import {Authenticated, Refine} from "@refinedev/core";
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import routerProvider, {
    DocumentTitleHandler, NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import {BrowserRouter, Outlet, Route, Routes} from "react-router";
import "./App.css";
import {Toaster} from "./components/refine-ui/notification/toaster";
import {useNotificationProvider} from "./components/refine-ui/notification/use-notification-provider";
import {ThemeProvider} from "./components/refine-ui/theme/theme-provider";
import {dataProvider} from "./providers/data.ts";
import Dashboard from "@/pages/dashboard.tsx";
import {Home, BookOpen, GraduationCap, Building2, Users, ClipboardCheck} from "lucide-react";
import {Layout} from "@/components/refine-ui/layout/layout.tsx";
import SubjectsList from "@/pages/subjects/list.tsx";
import SubjectsCreate from "@/pages/subjects/create.tsx";
import ClassesList from "@/pages/classes/list.tsx";
import ClassesCreate from "@/pages/classes/create.tsx";
import ClassesShow from "@/pages/classes/show.tsx";
import SubjectsShow from "@/pages/subjects/show.tsx";
import DepartmentsList from "@/pages/departments/list.tsx";
import DepartmentsCreate from "@/pages/departments/create.tsx";
import DepartmentsShow from "@/pages/departments/show.tsx";
import FacultyList from "@/pages/faculty/list.tsx";
import FacultyShow from "@/pages/faculty/show.tsx";
import EnrollmentsCreate from "@/pages/enrollments/create.tsx";
import EnrollmentsJoin from "@/pages/enrollments/join.tsx";
import EnrollmentsConfirm from "@/pages/enrollments/confirm.tsx";
import { Login } from "@/pages/login";
import {Register} from "@/pages/register";
import {authProvider} from "@/providers/auth.ts";
import {UserRole} from "@/types";

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ThemeProvider>
                    <DevtoolsProvider>
                        <Refine
                            dataProvider={dataProvider}
                            authProvider={authProvider}
                            notificationProvider={useNotificationProvider()}
                            routerProvider={routerProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                projectId: "18oQdm-M42Tfo-VJQvba",
                            }}
                            accessControlProvider={{
                                can: async ({resource, action}) => {
                                    const userJson = localStorage.getItem("user");
                                    if (!userJson) return {can: false};
                                    const user = JSON.parse(userJson);

                                    if (action === "field") return {can: true};

                                    if (resource === "subjects" || resource === "classes") {
                                        if (action === "create") {
                                            return {
                                                can: [UserRole.TEACHER, UserRole.ADMIN].includes(user.role),
                                                reason: "Only teachers and admins can create subjects and classes",
                                            };
                                        }
                                    }

                                    return {can: true};
                                },
                            }}
                            resources={[
                                {
                                    name: 'dashboard', list: '/', meta: {label: 'Home', icon: <Home/>}
                                },
                                {
                                    name: 'subjects',
                                    list: '/subjects',
                                    show: '/subjects/show/:id',
                                    create: '/subjects/create',
                                    meta: {label: 'Subjects', icon: <BookOpen/>}
                                },
                                {
                                    name: "departments",
                                    list: "/departments",
                                    show: "/departments/show/:id",
                                    create: "/departments/create",
                                    meta: {
                                        label: "Departments",
                                        icon: <Building2/>,
                                    },
                                },
                                {
                                    name: "users",
                                    list: "/faculty",
                                    show: "/faculty/show/:id",
                                    meta: {
                                        label: "Faculty",
                                        icon: <Users/>,
                                    },
                                },
                                {
                                    name: "enrollments",
                                    list: "/enrollments/create",
                                    create: "/enrollments/create",
                                    meta: {
                                        label: "Enrollments",
                                        icon: <ClipboardCheck/>,
                                    },
                                },
                                {
                                    name: 'classes',
                                    list: '/classes',
                                    create: '/classes/create',
                                    show: '/classes/show/:id',
                                    meta: {label: 'Classes', icon: <GraduationCap/>}
                                },


                            ]}
                        >
                            <Routes>
                                <Route
                                    element={
                                        <Authenticated key="public-routes" fallback={<Outlet />}>
                                            <NavigateToResource fallbackTo="/" />
                                        </Authenticated>
                                    }
                                >
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                </Route>


                                <Route element={
                                    <Authenticated key='private-routes' fallback={<Login/>}>
                                        <Layout>
                                            <Outlet/>
                                        </Layout>
                                    </Authenticated>
                                }>
                                    <Route path="/" element={<Dashboard/>}/>
                                    <Route path='subjects'>
                                        <Route index element={<SubjectsList/>}/>
                                        <Route path='create' element={<SubjectsCreate/>}/>
                                        <Route path="show/:id" element={<SubjectsShow/>}/>
                                    </Route>
                                    <Route path="departments">
                                        <Route index element={<DepartmentsList/>}/>
                                        <Route path="create" element={<DepartmentsCreate/>}/>
                                        <Route path="show/:id" element={<DepartmentsShow/>}/>
                                    </Route>
                                    <Route path="faculty">
                                        <Route index element={<FacultyList/>}/>
                                        <Route path="show/:id" element={<FacultyShow/>}/>
                                    </Route>

                                    <Route path="enrollments">
                                        <Route path="create" element={<EnrollmentsCreate/>}/>
                                        <Route path="join" element={<EnrollmentsJoin/>}/>
                                        <Route path="confirm" element={<EnrollmentsConfirm/>}/>
                                    </Route>

                                    <Route path='classes'>
                                        <Route index element={<ClassesList/>}/>
                                        <Route path='create' element={<ClassesCreate/>}/>
                                        <Route path='show/:id' element={<ClassesShow/>}/>
                                    </Route>
                                </Route>
                            </Routes>
                            <Toaster/>
                            <RefineKbar/>
                            <UnsavedChangesNotifier/>
                            <DocumentTitleHandler/>
                        </Refine>
                        <DevtoolsPanel/>
                    </DevtoolsProvider>
                </ThemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
