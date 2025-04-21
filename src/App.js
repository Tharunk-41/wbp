import { useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { Line } from "react-chartjs-2"
import { AllCommunityModule, ModuleRegistry, themeAlpine } from "ag-grid-community"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Container, Row, Col, Card, Form, Modal, CloseButton, Stack, Badge } from "react-bootstrap"
import "./App.css"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
ModuleRegistry.registerModules([AllCommunityModule])

function App() {
  const [selectedDate, setSelectedDate] = useState("31 Mar 2025")
  const [showGraph, setShowGraph] = useState(false)
  const defaultColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
  }
  const myTheme = themeAlpine.withParams({
    accentColor: "red",
  })

  // Dummy data for different dates
  const datesData = {
    "31 Mar 2025": {
      validationStatus: "Error",
      validatedBy: "",
      validationDateTime: "",
      matchingStats: [
        { foroType: "Auto Matched Records (Paired count)", count: 384 },
        { foroType: "Orphans", count: 17 },
        { foroType: "Manually matched (Paired count)", count: 2 },
      ],
      longRunningStats: [
        { statType: "Orphans > 2 days", count: 5 },
        { statType: "Orphans > 5 days", count: 3 },
        { statType: "Orphans > 1,000,000 Eur", count: 3 },
        { statType: "Number of deviations > 5 days", count: 2 },
      ],
      fileIntegration: [
        { fileType: "FX rates", jobId: "29186", linesReceived: 92, linesErrored: 0 },
        { fileType: "Back Operations", jobId: "29187", linesReceived: 385, linesErrored: 0 },
        { fileType: "Front Operations", jobId: "29188", linesReceived: 378, linesErrored: 0 },
        { fileType: "GL Positions", jobId: "29189", linesReceived: 67241, linesErrored: 0 },
        { fileType: "Front Positions", jobId: "29190", linesReceived: 31, linesErrored: 0 },
      ],
      trendData: {
        labels: ["1 Mar", "8 Mar", "15 Mar", "22 Mar", "29 Mar"],
        datasets: [
          {
            label: "Matched Records",
            data: [350, 380, 320, 400, 384],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: "Orphans",
            data: [25, 20, 15, 22, 17],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      },
    },
    "30 Mar 2025": {
      validationStatus: "Validated",
      validatedBy: "John Doe",
      validationDateTime: "30 Mar 2025 14:30",
      matchingStats: [
        { foroType: "Auto Matched Records (Paired count)", count: 372 },
        { foroType: "Orphans", count: 15 },
        { foroType: "Manually matched (Paired count)", count: 4 },
      ],
      longRunningStats: [
        { statType: "Orphans > 2 days", count: 4 },
        { statType: "Orphans > 5 days", count: 2 },
        { statType: "Orphans > 1,000,000 Eur", count: 2 },
        { statType: "Number of deviations > 5 days", count: 1 },
      ],
      fileIntegration: [
        { fileType: "FX rates", jobId: "29176", linesReceived: 90, linesErrored: 0 },
        { fileType: "Back Operations", jobId: "29177", linesReceived: 375, linesErrored: 0 },
        { fileType: "Front Operations", jobId: "29178", linesReceived: 368, linesErrored: 0 },
        { fileType: "GL Positions", jobId: "29179", linesReceived: 65241, linesErrored: 0 },
        { fileType: "Front Positions", jobId: "29180", linesReceived: 29, linesErrored: 0 },
      ],
      trendData: {
        labels: ["1 Mar", "8 Mar", "15 Mar", "22 Mar", "30 Mar"],
        datasets: [
          {
            label: "Matched Records",
            data: [350, 380, 320, 400, 372],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: "Orphans",
            data: [25, 20, 15, 22, 15],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      },
    },
    "29 Mar 2025": {
      validationStatus: "Validated",
      validatedBy: "Jane Smith",
      validationDateTime: "29 Mar 2025 16:45",
      matchingStats: [
        { foroType: "Auto Matched Records (Paired count)", count: 390 },
        { foroType: "Orphans", count: 12 },
        { foroType: "Manually matched (Paired count)", count: 3 },
      ],
      longRunningStats: [
        { statType: "Orphans > 2 days", count: 3 },
        { statType: "Orphans > 5 days", count: 1 },
        { statType: "Orphans > 1,000,000 Eur", count: 2 },
        { statType: "Number of deviations > 5 days", count: 1 },
      ],
      fileIntegration: [
        { fileType: "FX rates", jobId: "29166", linesReceived: 91, linesErrored: 0 },
        { fileType: "Back Operations", jobId: "29167", linesReceived: 382, linesErrored: 0 },
        { fileType: "Front Operations", jobId: "29168", linesReceived: 375, linesErrored: 0 },
        { fileType: "GL Positions", jobId: "29169", linesReceived: 66241, linesErrored: 0 },
        { fileType: "Front Positions", jobId: "29170", linesReceived: 30, linesErrored: 0 },
      ],
      trendData: {
        labels: ["1 Mar", "8 Mar", "15 Mar", "22 Mar", "29 Mar"],
        datasets: [
          {
            label: "Matched Records",
            data: [350, 380, 320, 400, 390],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: "Orphans",
            data: [25, 20, 15, 22, 12],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      },
    },
    "28 Mar 2025": {
      validationStatus: "Error",
      validatedBy: "",
      validationDateTime: "",
      matchingStats: [
        { foroType: "Auto Matched Records (Paired count)", count: 365 },
        { foroType: "Orphans", count: 20 },
        { foroType: "Manually matched (Paired count)", count: 1 },
      ],
      longRunningStats: [
        { statType: "Orphans > 2 days", count: 6 },
        { statType: "Orphans > 5 days", count: 4 },
        { statType: "Orphans > 1,000,000 Eur", count: 3 },
        { statType: "Number of deviations > 5 days", count: 3 },
      ],
      fileIntegration: [
        { fileType: "FX rates", jobId: "29156", linesReceived: 92, linesErrored: 1 },
        { fileType: "Back Operations", jobId: "29157", linesReceived: 380, linesErrored: 2 },
        { fileType: "Front Operations", jobId: "29158", linesReceived: 370, linesErrored: 1 },
        { fileType: "GL Positions", jobId: "29159", linesReceived: 65000, linesErrored: 5 },
        { fileType: "Front Positions", jobId: "29160", linesReceived: 28, linesErrored: 0 },
      ],
      trendData: {
        labels: ["1 Mar", "8 Mar", "15 Mar", "22 Mar", "28 Mar"],
        datasets: [
          {
            label: "Matched Records",
            data: [350, 380, 320, 400, 365],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: "Orphans",
            data: [25, 20, 15, 22, 20],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      },
    },
  }
  // Separate function for cellRenderer
  const exportCellRenderer = (params) => {
    return (
      <div className="d-flex justify-content-center align-items-center h-100" style={{ cursor: "pointer" }}
        onClick={() => console.log("Download ID:", params.value)}>
        <img alt="Export" src="https://www.ag-grid.com/theme-icons/balham/save.svg" style={{ width: 20, height: 20 }} />
      </div>
    )
  }
  // AG Grid column definitions for matching stats
  const matchingStatsColumns = [
    {
      headerName: "Export",
      field: "export",
      width: 20,
      filter: false,
      sortable: false,
      flex: 0,
      cellRenderer: exportCellRenderer,
      onCellClicked: (params) => {
        alert(`Exporting data for: ${params.data}}`)
      },
    },
    { headerName: "FORO Type", field: "foroType", sortable: true, filter: true },
    { headerName: "Count", field: "count", sortable: true, filter: true },
  ]

  // AG Grid column definitions for long running stats
  const longRunningStatsColumns = [
    {
      headerName: "Export",
      field: "export",
      width: 20,
      filter: false,
      sortable: false,
      flex: 0,
      cellRenderer: exportCellRenderer,
      onCellClicked: (params) => {
        alert(`Exporting data for: ${params.data}`)
      },
    },
    { headerName: "Stat Type", field: "statType", sortable: true, filter: true },
    { headerName: "Count", field: "count", sortable: true, filter: true },
  ]

  // AG Grid column definitions for file integration
  const fileIntegrationColumns = [
    {
      headerName: "Export",
      field: "export",
      filter: false,
      sortable: false,
      width: 20,
      flex: 0,
      cellRenderer: exportCellRenderer,
      onCellClicked: (params) => {
        alert(`Exporting data for: ${params.data}`)
      },
    },
    { headerName: "File Type", field: "fileType", sortable: true, filter: true },
    { headerName: "Job ID", field: "jobId", sortable: true, filter: true },
    { headerName: "No. of lines received", field: "linesReceived", sortable: true, filter: true },
    { headerName: "No. of lines errored", field: "linesErrored", sortable: true, filter: true },
  ]

  // Handle row click
  const handleRowClick = (params) => {
    if (params.colDef?.field !== "export") {
      alert(`You clicked on a row with data: ${JSON.stringify(params.data)}`)
    }
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Trend graph for the selected month",
      },
    },
  }

  // Render validation status badge
  const renderValidationStatus = (status) => {
    if (status === "Validated") {
      return <Badge bg="success">Validated</Badge>
    } else if (status === "Error") {
      return <Badge bg="danger">Error</Badge>
    }
    return <Badge bg="secondary">{status}</Badge>
  }

  return (
    <Container fluid>
      <h3 className="mt-3 mb-4">QUITUS (Quality and Monitoring FX Positions)</h3>

      {/* Date selector and validation info */}
      <Card className="mb-2">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                {Object.keys(datesData).map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Stack>
                <div><strong>Validation Status:</strong> {renderValidationStatus(datesData[selectedDate].validationStatus)}</div>
                <div><strong>Validated By:</strong> {datesData[selectedDate].validatedBy}</div>
                <div><strong>Validation Date Time:</strong> {datesData[selectedDate].validationDateTime}</div>
              </Stack>
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-end">
              {datesData[selectedDate].validationStatus === "Error" && (
                <Badge bg="danger" className="p-2">
                  Validation Error
                </Badge>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Summary section */}
      <h4 className="card-title mb-2">Summary</h4>

      {/* Four quadrant cards */}
      <Row className="mb-1">
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h5">Matching Stats</Card.Title>
              <div className="ag-theme-alpine" style={{ height: 300 }}>
                <AgGridReact
                  rowData={datesData[selectedDate].matchingStats}
                  columnDefs={matchingStatsColumns}
                  onCellClicked={handleRowClick}
                  rowSelection="single"
                  defaultColDef={defaultColDef}
                  theme={myTheme}
                  pagination={true} // Enable Pagination
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h5">Long Running Stats</Card.Title>
              <div className="ag-theme-alpine" style={{ height: 300 }}>
                <AgGridReact
                  rowData={datesData[selectedDate].longRunningStats}
                  columnDefs={longRunningStatsColumns}
                  onCellClicked={handleRowClick}
                  rowSelection="single"
                  defaultColDef={defaultColDef}
                  theme={myTheme}
                  pagination={true} // Enable Pagination
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        {/* Bottom left card - Monthly trend analysis */}
        <Col md={6} className="mb-4">
          <Card className="h-100" onClick={() => setShowGraph(true)}>
            <Card.Body>
              <Card.Title as="h5">Monthly View Trend Analysis</Card.Title>
              <div style={{ height: 300 }}>
                <Line options={chartOptions} data={datesData[selectedDate].trendData} />
              </div>
              <div className="text-center mt-3">
                <small>Trend graph for the selected month</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Bottom right card - File integration summary */}
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h5">QUITUS Input File Integration Summary</Card.Title>
              <div className="ag-theme-alpine" style={{ height: 300 }}>
                <AgGridReact
                  rowData={datesData[selectedDate].fileIntegration}
                  columnDefs={fileIntegrationColumns}
                  onCellClicked={handleRowClick}
                  rowSelection="single"
                  defaultColDef={defaultColDef}
                  theme={myTheme}
                  pagination={true} // Enable Pagination
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Graph modal */}
      <Modal show={showGraph} onHide={() => setShowGraph(false)} size="lg" centered dialogClassName="modal-90w">
        <Modal.Header>
          <Modal.Title>Monthly Trend Analysis</Modal.Title>
          <CloseButton onClick={() => setShowGraph(false)} />
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: 500 }}>
            <Line options={chartOptions} data={datesData[selectedDate].trendData} />
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default App
