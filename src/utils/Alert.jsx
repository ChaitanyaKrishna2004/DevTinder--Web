export const SuccessAlert = ({ Msg }) => {
    return (
        <div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>{Msg}</span>
            </div>
        </div>
    )
}

export const ErrorAlert = ({ Msg }) => {
    return (
        <div className="toast toast-top toast-center">
            <div className="alert alert-error">
                <span>{Msg}</span>
            </div>
        </div>
    )
}


