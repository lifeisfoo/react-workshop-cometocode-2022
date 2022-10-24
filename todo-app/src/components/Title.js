function Row({ children }) {
  return <div className="row">{children}</div>;
}
export default function Title({ children }) {
  return (
    <Row>
      <div className="col d-flex justify-content-center">
        <h1>{children}</h1>
      </div>
    </Row>
  );
}
