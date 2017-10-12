export const update = <S, K extends keyof S>(toUpdate: S, update: Pick<S, K>): S => {
    return Object.assign({}, toUpdate, update);
}