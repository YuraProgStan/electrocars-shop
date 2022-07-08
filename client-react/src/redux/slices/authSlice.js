import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authService} from "../../services/auth.service";

const login = createAsyncThunk(
    'authSlice/loginFetching',
    async ({user}) => {
        const {data} = await authService.login(user);
        return data
    }
)

const registration = createAsyncThunk(
    'authSlice/registrationFetching',
    async ({user}) => {
        delete user.passwordConfirm
        console.log('user', user)
        const {data} = await authService.register(user);
        return data
    }
)

const me = createAsyncThunk(
    'authSlice/me',
    async (_) => {
        const {data} = await authService.me();
        return data
    }
)
const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        // isAuth: null,
        // loginError: null,
        username: null,
        currentUser: null,
        loading: false,
        error: null,

    },
    reducers: {
        resetUsernameError: (state) => {
            state.username = null;
            state.error = null;
        },
        logout: (state) => {
            state.currentUser = null
        },
        setError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                // state.isAuth = true;
                // state.loginError = false;
                // const {access, refresh} = action.payload;

                state.currentUser = action.payload;
                state.error = null;
                const {accessToken, refreshToken} = action.payload;
                localStorage.setItem('access', accessToken);
                localStorage.setItem('refresh', refreshToken);
            })
            .addCase(login.rejected, (state,action) => {
                state.error = action.error.message;
            })
            .addCase(me.fulfilled, (state, action) => {
                console.log('me');
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(me.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.username = action.payload.username
            })

            .addCase(registration.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})

const {reducer: authReducer, actions: {logout, setError, resetUsernameError}} = authSlice;
const authActions = {login, me, registration,  resetUsernameError, logout, setError}

export {
    authReducer,
    authActions
}