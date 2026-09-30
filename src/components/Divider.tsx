const Divider: React.FC<{isHorizontal: boolean}> = ({ isHorizontal }) => {
    if(isHorizontal) {
        return (
            <div className="flex w-full h-1 stroke-white"></div>
        );
    }
    else {
        return (
            <div className="flex w-1 h-full stroke-white"></div>
        );
    }
}

export default Divider;