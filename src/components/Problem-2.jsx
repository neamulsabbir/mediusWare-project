import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const btnModalAColor = {
  backgroundColor: "#46139f",
};
const btnModalBColor = {
  backgroundColor: "#ff7f50",
};

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [showData, setShowData] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);

  useEffect(() => {
    fetch("https://contact.mediusware.com/api/contacts/")
      .then((res) => res.json())
      .then((data) => setShowData(data?.results));
  }, []);

  const usNumbers = showData.filter(
    (item) => item.country.name === "United States"
  );
  const evenNumbers = showData.filter((item, index) => index % 2 === 0);
  //   console.log(evenNumbers);

  const openDetailsModal = (phoneDetails) => {
    setSelectedPhoneNumber(phoneDetails);
    setShowDetailsModal(true);
  };

  const openModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
  };

  const openModalB = () => {
    setShowModalB(true);
    setShowModalA(false);
  };

  const handleCloseModalA = () => setShowModalA(false);
  const handleCloseModalB = () => setShowModalB(false);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className=" btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      <Modal show={showModalA} onHide={handleCloseModalA}>
        <Modal.Header closeButton>
          <Modal.Title>All Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button style={btnModalAColor} onClick={openModalA}>
            All Contacts
          </Button>
          <Button style={btnModalBColor} onClick={openModalB}>
            US Contacts
          </Button>
          <Button style={btnModalAColor} onClick={handleCloseModalA}>
            Close
          </Button>
        </Modal.Footer>
        <Modal.Body>
          <div>
            {onlyEven
              ? evenNumbers.map((country, i) => (
                  <div key={i} onClick={() => openDetailsModal(country)}>
                    <li className="fs-3 cursor-pointer">{country?.phone}</li>
                  </div>
                ))
              : showData.map((country, i) => (
                  <div key={i} onClick={() => openDetailsModal(country)}>
                    <li className="fs-3 cursor-pointer">{country?.phone}</li>
                  </div>
                ))}
          </div>
          <Form.Check
            type="checkbox"
            label="Only even"
            checked={onlyEven}
            onChange={() => setOnlyEven(!onlyEven)}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showModalB} onHide={handleCloseModalB}>
        <Modal.Header closeButton>
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button style={btnModalAColor} onClick={openModalB}>
            US Contacts
          </Button>
          <Button style={btnModalBColor} onClick={openModalA}>
            All Contacts
          </Button>
          <Button style={btnModalAColor} onClick={handleCloseModalB}>
            Close
          </Button>
        </Modal.Footer>
        <Modal.Body>
          <div>
            {onlyEven
              ? evenNumbers.map((country, i) => (
                  <div key={i} onClick={() => openDetailsModal(country)}>
                    <li className="fs-3 cursor-pointer">{country?.phone}</li>
                  </div>
                ))
              : usNumbers.map((country, i) => (
                  <div key={i} onClick={() => openDetailsModal(country)}>
                    <li className="fs-3 cursor-pointer">{country?.phone}</li>
                  </div>
                ))}
          </div>
          <Form.Check
            type="checkbox"
            label="Only even"
            checked={onlyEven}
            onChange={() => setOnlyEven(!onlyEven)}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Phone Number Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>ID: {selectedPhoneNumber?.id}</p>
            <p>Phone Number: {selectedPhoneNumber?.phone}</p>
            <p>Country: {selectedPhoneNumber?.country.name}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={btnModalAColor}
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;
