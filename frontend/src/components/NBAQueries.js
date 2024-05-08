import React, { useState, useEffect } from "react";

    import SortableTable from "./Table";

export default function NBAQuery(queryData) {
    const [responseData, setResponseData] = useState(null);
    // console.log('QD', queryData);
    const fetchData = async (queryData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/nba', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(queryData),
            });
            const data = await response.json();
            setResponseData(data);
            console.log(data.message);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    
    const requestData = queryData.requestData;
    
    useEffect(() => {
        // console.log(requestData);
        fetchData(requestData);
    }, [queryData]); // Run only once on component mount

    if (!responseData) {
        return <div>Loading...</div>;
    }

    return (
        <SortableTable responseData={responseData} />

    );
}
