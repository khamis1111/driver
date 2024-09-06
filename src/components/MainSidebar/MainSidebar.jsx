import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.png'
import notify from '../../utils/useToastify'
import { Card } from '../ui/card'
import './MainSidebar.css'

const MainSidebar = ({ isActive, setIsActive }) => {
    const handleShowSidebar = (e) => {
        setIsActive(!isActive)
    }
    const handelLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setTimeout(() => {
            window.location.href = '/login'
        }, 1000);
        notify('تم تسجيل الخروج', 'success')
    }

    return (
        <div>
            <Card className="main-sidebar border-0 rounded-5 d-flex flex-column justify-content-between">
                <div className="up">
                    <div className="logo fw-bold fs-3 mb-4 d-flex align-items-center gap-1">
                        <img
                            src={logo}
                            alt="logo"
                            width={50}
                        />
                        <span className="logo-title">عيادتي</span>
                    </div>
                    <div className="menu">
                        <p className="menu-title text-muted text-uppercase pb-3">القائمة الرئيسية</p>
                        <div className="menu-list d-flex flex-column text-capitalize">
                            <NavLink to="/" aria-current="page">
                                <span className="d-flex align-items-center gap-1">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 24 24"
                                        height={25}
                                        width={25}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M11 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h6v18zm2 0h6c1.1 0 2-.9 2-2v-7h-8v9zm8-11V5c0-1.1-.9-2-2-2h-6v7h8z" />
                                    </svg>{" "}
                                    <name>لوحة التحكم</name>
                                </span>
                            </NavLink>
                            <NavLink to="/patients">
                                <span className="d-flex align-items-center gap-1">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 448 512"
                                        height={25}
                                        width={25}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M240 80H342.7c-7.9-19.5-20.4-36.5-36.2-49.9L240 80zm37.7-68.2C261.3 4.2 243.2 0 224 0c-53.7 0-99.7 33.1-118.7 80h81.4l91-68.2zM224 256c70.7 0 128-57.3 128-128c0-5.4-.3-10.8-1-16H97c-.7 5.2-1 10.6-1 16c0 70.7 57.3 128 128 128zM124 312.4c-9.7 3.1-19.1 7-28 11.7V512H243.7L181.5 408.2 124 312.4zm33-7.2L204.3 384H272c44.2 0 80 35.8 80 80c0 18-6 34.6-16 48h82.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3c-7.2 0-14.3 .4-21.3 1.3zM0 482.3C0 498.7 13.3 512 29.7 512H64V345.4C24.9 378.1 0 427.3 0 482.3zM320 464c0-26.5-21.5-48-48-48H223.5l57.1 95.2C303 507.2 320 487.6 320 464z" />
                                    </svg>{" "}
                                    <name>المرضي</name>
                                </span>
                            </NavLink>
                            <NavLink to="/appointments">
                                <span className="d-flex align-items-center gap-1">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 512 512"
                                        height={25}
                                        width={25}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M32 456a24 24 0 0024 24h400a24 24 0 0024-24V176H32zm320-244a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm-80-80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm-80-80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm-80-80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 00-24 23.77V144h448V87.77A23.8 23.8 0 00456 64z" />
                                    </svg>{" "}
                                    <name>المواعيد</name>
                                </span>
                            </NavLink>
                        </div>
                    </div>
                </div>
                {
                    localStorage.getItem('user') !== null &&
                    <span className="logout d-flex align-items-center gap-1" onClick={(e) => handelLogout(e)}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 512 512"
                            height={25}
                            width={25}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M160 256a16 16 0 0116-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h160a56.06 56.06 0 0056-56V272H176a16 16 0 01-16-16zm299.31-11.31l-80-80a16 16 0 00-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1022.62 22.62l80-80a16 16 0 000-22.62z" />
                        </svg>{" "}
                        <name>تسجيل الخروج</name>
                    </span>
                }
            </Card>
            <div className="show-menu" onClick={(e) => handleShowSidebar(e)}>
                <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 512 512"
                    height={30}
                    width={30}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
                </svg>
            </div>
        </div>

    )
}

export default MainSidebar
