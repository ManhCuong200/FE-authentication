const UserProfile = ({ user, onLogout }) => {
    if (!user) {
        return (
            <div className="flex justify-center items-center h-60">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-xl w-full mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">

            <div className="flex flex-col items-center pt-10 pb-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow-inner">
                    {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-5xl">😊</span>
                    )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>

            <div className="border-t border-gray-200"></div>

            <div className="px-8 py-6 space-y-4">
                <InfoRow label="Tên đầy đủ" value={user.name} />
                <InfoRow label="Email" value={user.email} />
                <InfoRow
                    label="Vai trò"
                    value={user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                />
            </div>

            <div className="px-8 pb-8">
                <button
                    onClick={() => onLogout()}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500 w-1/3">{label}</span>
        <span className="text-gray-900 font-medium text-right flex-1">{value}</span>
    </div>
);

export default UserProfile;
