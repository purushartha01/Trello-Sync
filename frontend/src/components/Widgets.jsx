

const Spinner = ({classes} ) => {
    return (
        <div className={`h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-white ${classes}`}></div>
    );
}

export { Spinner };