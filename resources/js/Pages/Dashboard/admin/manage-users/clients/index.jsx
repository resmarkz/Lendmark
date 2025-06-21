const AdminManageClientsSubpage = ({ clients }) => {
    return (
        <div>
            <pre>{JSON.stringify(clients, null, 2)}</pre>
        </div>
    );
};

export default AdminManageClientsSubpage;
