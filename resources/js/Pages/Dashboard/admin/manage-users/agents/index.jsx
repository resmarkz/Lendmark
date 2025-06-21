const AdminManageAgentsSubpage = ({ agents }) => {
    return (
        <div>
            <pre>{JSON.stringify(agents, null, 2)}</pre>
        </div>
    );
};

export default AdminManageAgentsSubpage;
