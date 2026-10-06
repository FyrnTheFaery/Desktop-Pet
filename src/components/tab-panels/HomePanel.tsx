import Button from "../wrappers/Button"

export const HomePanel: React.FC<{}> = () => {
    return (
        <>
            <section className="flex flex-col">
                <h2>Choose Your Models</h2>
                <section className="flex flex-row">
                    {/* Make each of these dropdowns so the user can scroll through their created models */}
                    <p>Mouse Model</p>
                    <p>Keyboard Model</p>
                    <p>PNGTuber Model</p>
                </section>
                <Button>Open Selected Models</Button>
            </section>
            <section>
                <h2>Collaborators</h2>
                
            </section>
        </>
    )
}