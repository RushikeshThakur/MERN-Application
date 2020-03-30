import axios from "axios";

class SecureCallService {
    constructor() {
        this.url = 'http://localhost:6070';
    }

    checkForUniqueId(username)  {
        
        let response = axios.post(`${this.url}/api/users/uniqueId`,
            username, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    // register users
    register(user) {
        let response = axios.post(`${this.url}/api/users/register`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    // login users
    login(user) {
        let response = axios.post(`${this.url}/api/users/authuser`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    getStudents(token) {
        let response = axios.get(`${this.url}/api/students`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    getStudent(id, token) {
        let response = axios.get(`${this.url}/api/students/${id}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    postStudent(student, token) {
        let response = axios.post(`${this.url}/api/students`, student, {
            headers: {
                'Content-type': 'application/json',
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    putStudent(student, token) {
        let response = axios.put(`${this.url}/api/students/${student.Username}`, student, {
            headers: {
                'Content-type': 'application/json',
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    deleteStudent(id, token) {
        let response = axios.delete(`${this.url}/api/students/${id}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    
    searchStudents(value, option, token) {
        let response;
        
        if(option === 'University')  {
            response = axios.post(`${this.url}/api/students/searchUniversity/${value}`, null, {
                headers: {
                    'AUTHORIZATION': `Bearer ${token}`
                }
            });
        }
        else {
            if(option === 'Course')  {
                response = axios.post(`${this.url}/api/students/searchCourse/${value}`, null, {
                    headers: {
                        'AUTHORIZATION': `Bearer ${token}`
                    }
                });
            }
        }
        return response;
    }
}

export default SecureCallService;