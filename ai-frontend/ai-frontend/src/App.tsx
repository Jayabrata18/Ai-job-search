// import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ColDef } from "ag-grid-community";
// import { themeQuartz } from "@ag-grid-community/theming";

// to use myTheme in an application, pass it to the theme grid option
// const myTheme = themeQuartz.withParams({
//     accentColor: "#15BDE8",
//     backgroundColor: "#0C0C0D",
//     borderColor: "#ffffff00",
//     borderRadius: 20,
//     browserColorScheme: "dark",
//     cellHorizontalPaddingScale: 1,
//     chromeBackgroundColor: {
//         ref: "backgroundColor"
//     },
//     columnBorder: false,
//     fontFamily: {
//         googleFont: "Roboto"
//     },
//     fontSize: 16,
//     foregroundColor: "#BBBEC9",
//     headerBackgroundColor: "#182226",
//     headerFontSize: 14,
//     headerFontWeight: 500,
//     headerTextColor: "#FFFFFF",
//     headerVerticalPaddingScale: 0.9,
//     iconSize: 20,
//     rowBorder: false,
//     rowVerticalPaddingScale: 1.2,
//     sidePanelBorder: false,
//     spacing: 8,
//     wrapperBorder: false,
//     wrapperBorderRadius: 0
// });

interface JobListing {
    No: number;
    title: string;
    description: string;
    experience: string;
    llm_response: string;
    job_url: string;
}

function App() {
    // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    // const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    // useEffect(() => {
    //     // Update window size on resize
    //     const handleResize = () => {
    //         setWindowWidth(window.innerWidth);
    //         setWindowHeight(window.innerHeight);
    //     };

    //     // Add event listener on mount
    //     window.addEventListener("resize", handleResize);

    //     // Cleanup on unmount
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);
    const [data, setData] = useState<JobListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const colDefs: ColDef<JobListing>[] = [
        { field: "No" },
        { field: "title" },
        { field: "description" },
        { field: "experience" },
        { field: "llm_response", resizable: true },
        {
            field: "job_url",
            //  cellRenderer: "linkRenderer",
            // cellRenderer: "agGroupCellRenderer"
            resizable: true
        }
    ];

    useEffect(() => {
        // Fetch data from backend
        axios
            .get("http://localhost:5555")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    // console.log(data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Job Listings</h1>
            <table border={1} style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        
                        <th>Description</th>
                        <th>Experience</th>
                        <th>LLM Response</th>
                        <th>Job URL</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.title}</td>
                            <td>{row.description.length > 1200 ? row.description.substring(0, 1200) + "..." : row.description}</td>
                            <td>{row.experience}</td>
                            <td>{row.llm_response}</td>
                            <td>
                                <a href={row.job_url} target="_blank" rel="noopener noreferrer">
                                    Link
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div
                className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: windowHeight, width: windowWidth }}
            >
                <AgGridReact theme={myTheme} rowData={data} columnDefs={colDefs} rowHeight={100} rowW />
            </div> */}
        </div>
    );
}

export default App;
