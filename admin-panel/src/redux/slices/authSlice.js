import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authService} from '../../services/auth.service';

const login = createAsyncThunk(
    'authSlice/loginFetching',
    async ({user},  {rejectWithValue }) => {
        try {
            const {data} = await authService.login(user);
            return data
        }catch (err) {
            return rejectWithValue(err.response.data)
        }

    }
)


const registration = createAsyncThunk(
    'authSlice/registrationFetching',
    async ({user}) => {
        delete user.passwordConfirm;
        console.log('user', user);
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

const googleAuth = createAsyncThunk(
    'authSlice/googleAuthFetching',
    async (token,  {rejectWithValue }) => {
        const {data} = await authService.googleAuth(token)
        return data
    }
)

const facebookAuth = createAsyncThunk(
    'authSlice/facebookAuthFetching',
    async (user, {rejectWithValue }) => {
        const {data} = await authService.facebookAuth(user)
        console.log('fetchFacebook')
        console.log(data)
        console.log('fetchFacebook')
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
            state.currentUser = null;
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
        setError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.error = null;
                const {accessToken, refreshToken} = action.payload;
                localStorage.setItem('access', accessToken);
                localStorage.setItem('refresh', refreshToken);
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(me.fulfilled, (state, action) => {
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
            .addCase(googleAuth.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.error = null;
                const {accessToken, refreshToken} = action.payload;
                localStorage.setItem('access', accessToken);
                localStorage.setItem('refresh', refreshToken);
                state.loading = false;
            })
            .addCase(googleAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(googleAuth.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(facebookAuth.fulfilled, (state, action) => {
                console.log('Facebookfullfilled', action)
                state.currentUser = action.payload;
                state.error = null;
                const {accessToken, refreshToken} = action.payload;
                localStorage.setItem('access', accessToken);
                localStorage.setItem('refresh', refreshToken);
                state.loading = false;
            })
            .addCase(facebookAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(facebookAuth.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })
    }
})

const {reducer: authReducer, actions: {logout, setError, resetUsernameError}} = authSlice;
const authActions = {login, me, registration, googleAuth, facebookAuth, resetUsernameError, logout, setError}

export {
    authReducer,
    authActions
}