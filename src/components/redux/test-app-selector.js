

const state = {
   signIn:''
}

// export const testUseAppSelector = (f) => f(state)
export const testUseAppSelector = (state) => (selectorFn) => selectorFn(state);