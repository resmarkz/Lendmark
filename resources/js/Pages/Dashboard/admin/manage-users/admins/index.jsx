const AdminManageAdminsSubpage = ({ admins }) => {
    return (
        <div>
            <pre>{JSON.stringify(admins, null, 2)}</pre>
        </div>
    );
};

export default AdminManageAdminsSubpage;
