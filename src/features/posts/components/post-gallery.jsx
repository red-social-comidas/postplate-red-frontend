import { useState } from "react";
import { Carousel, Col, Image, Modal, Ratio, Row, Stack } from "react-bootstrap";

const MAX_GALLERY_IMAGES = 4;

export const PostGallery = ({ files }) => {
	const [show, setShow] = useState(false);
	const [carouselIdx, setCarouselIdx] = useState(0);

	const handleClose = () => setShow(false);

	const handleSelect = (index) => {
		setCarouselIdx(index);
		setShow(true);
	};

	const remainingFiles = files.length - MAX_GALLERY_IMAGES;

	return (
		<>
			{files.length === 0 ? null : files.length === 1 ? (
				<Ratio aspectRatio="4x3" onClick={() => handleSelect(0)} role="button">
					<Image src={files[0].file} fluid className="object-fit-cover rounded border" />
				</Ratio>
			) : files.length === 2 ? (
				<Row xs={2} style={{ "--bs-gutter-x": "2px" }}>
					{files.map((file, i) => (
						<Col key={i}>
							<Ratio aspectRatio="1x1" onClick={() => handleSelect(i)} role="button">
								<Image src={file.file} fluid className="object-fit-cover rounded border" />
							</Ratio>
						</Col>
					))}
				</Row>
			) : files.length === 3 ? (
				<Row xs={2} style={{ "--bs-gutter-x": "2px" }}>
					<Col>
						{files.slice(0, 1).map((file, i) => (
							<Ratio key={i} aspectRatio="1x1" onClick={() => handleSelect(i)} role="button">
								<Image src={file.file} fluid className="object-fit-cover rounded border" />
							</Ratio>
						))}
					</Col>
					<Col>
						<Stack gap={1}>
							{files.slice(1, 3).map((file, idx) => (
								<Ratio key={idx} aspectRatio={2 / 4} onClick={() => handleSelect(idx + 1)} role="button">
									<Image src={file.file} fluid className="object-fit-cover rounded border " />
								</Ratio>
							))}
						</Stack>
					</Col>
				</Row>
			) : (
				<>
					{files.length === 4 ? (
						<Stack gap={1}>
							<Row xs={2} style={{ "--bs-gutter-x": "4px" }}>
								{files.slice(0, 2).map((file, i) => (
									<Col key={i}>
										<Ratio aspectRatio={1 / 2} onClick={() => handleSelect(i)} role="button">
											<Image src={file.file} fluid className="object-fit-cover rounded border " />
										</Ratio>
									</Col>
								))}
							</Row>
							<Row xs={2} style={{ "--bs-gutter-x": "4px" }}>
								{files.slice(2, 4).map((file, i) => (
									<Col key={i}>
										<Ratio aspectRatio={2 / 4} onClick={() => handleSelect(i + 2)} role="button">
											<Image src={file.file} fluid className="object-fit-cover rounded border " />
										</Ratio>
									</Col>
								))}
							</Row>
						</Stack>
					) : (
						<Stack gap={1}>
							<Row xs={2} style={{ "--bs-gutter-x": "4px" }}>
								{files.slice(0, 2).map((file, i) => (
									<Col key={i}>
										<Ratio aspectRatio={1 / 2} onClick={() => handleSelect(i)} role="button">
											<Image src={file.file} fluid className="object-fit-cover rounded border " />
										</Ratio>
									</Col>
								))}
							</Row>
							<Row xs={2} style={{ "--bs-gutter-x": "4px" }}>
								{files.slice(2, 4).map((file, i) => (
									<Col key={i}>
										<div className="position-relative" onClick={() => handleSelect(i + 2)} role="button">
											<Ratio aspectRatio={1 / 2}>
												<Image src={file.file} fluid className="object-fit-cover rounded border " />
											</Ratio>

											{i === 1 ? (
												<>
													<div className="position-absolute top-0 bottom-0 opacity-50 fs-1 w-100 h-100 d-flex justify-content-center align-items-center bg-secondary rounded"></div>
													<div className="position-absolute top-0 bottom-0 fs-1 w-100 h-100 d-flex justify-content-center align-items-center">
														+{remainingFiles}
													</div>
												</>
											) : null}
										</div>
									</Col>
								))}
							</Row>
						</Stack>
					)}
				</>
			)}

			<Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered size="lg">
				<Modal.Header closeButton>#TODO: Modal Header</Modal.Header>
				<Modal.Body>
					<Carousel activeIndex={carouselIdx} onSelect={handleSelect}>
						{files.map((file, idx) => (
							<Carousel.Item key={idx}>
								<Ratio aspectRatio="16x9">
									<Image src={file.file} fluid className="object-fit-contain rounded border" />
								</Ratio>
							</Carousel.Item>
						))}
					</Carousel>
				</Modal.Body>
				<Modal.Footer>#TODO: Modal Footer</Modal.Footer>
			</Modal>
		</>
	);
};
