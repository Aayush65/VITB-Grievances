

const SubmitGrievance = () => {

    function handleSubmit() {
    }

    return (
        <div className="w-screen min-h-screen p-20">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label>
                    Subject:
                    <input type="text" />
                </label>
                <label>
                    Related Departments / Admins
                    <input type="text" />
                </label>
                <textarea cols={10} rows={10} />
            </form>
        </div>
    )
}

export default SubmitGrievance;