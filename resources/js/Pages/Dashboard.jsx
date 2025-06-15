function Dashboard({ auth }) {
    return (
        <div>
            <h1>test</h1>
            <pre>{JSON.stringify(auth, null, 2)}</pre>
        </div>
    );
}

Dashboard.layout = (page) => page;

export default Dashboard;
