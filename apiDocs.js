const userIdentity = 'me'
const bookingIdentity = 'book'
const apiURL = 'http://localhost:5000'

const routes = {
    User: [
        {
            method: 'POST',
            path: `${userIdentity}/getMe`,
            details: {
                Request: {
                    headers: {
                        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE1MiwiZW1haWwiOiJyc3RoYW9mZmljaWFsQGdtYWlsLmNvbSIsImlhdCI6MTY1NTg3NTc3NCwiZXhwIjoxNjU4NDY3Nzc0fQ.Z9Y1Bm0FuNJLbztlgNnLNntwukxqYgNF_dPukIeLpWQ'
                    }
                },
                Documentation: 'This Route gets a user by verifying the authorization token sent in the header'
            }
        },
        {
            method: 'POST',
            path: `${userIdentity}/changeEmail`,
            details: {
                Request: {
                    headers: {
                        'authorization': 'Bearer <Token>'
                    },
                    params: {
                        requirement: `either one of the queries is required one for sending and other for verifying`,
                        sendOtp: 1,
                        verifyOtp: 1
                    },
                    body: {
                        otp: '908070',
                        newEmail: 'newmail@email.com'
                    }
                },
                Documentation: `This route is called to change the user's email`
            }
        },
    ],
    Booking: [
        {
            method: 'GET',
            path: `${bookingIdentity}/getRoom`,
            details: {
                Request: {
                },
                Documentation: `This route is called to change the user's email`
            }
        },     
    ]
}

export { routes, apiURL }