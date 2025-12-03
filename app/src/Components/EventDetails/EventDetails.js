export default function EventDetails({givenTitle,givenDate,givenTime,givenLocation,givenRole,givenDescription}) {
    return (
        <div className="event-container">
            <h1 className={"title"}>{givenTitle}</h1>
            <div className={"date-time-wrapper"}>
                <h2 className={"date"}>{givenDate}</h2>
                <h2 className={"time"}>{givenTime}</h2>
            </div>
            <h6 className={"card-location"}>{givenLocation}</h6>
            <h6 className={"card-location"}>{givenRole}</h6>
            <p className={"card-description"}>{givenDescription}</p>
        </div>
    );
}