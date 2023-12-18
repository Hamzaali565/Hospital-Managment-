export const BED = async (req, res, serviceArray, model) => {
  try {
    const { erNo, mrNo, patientName, gender, partyCode } = req.body;
    if (
      ![erNo, mrNo, patientName, gender, partyCode, serviceArray].every(Boolean)
    )
      throw new Error("All Parameters Are Required");
    if (serviceArray.length === 0)
      throw new Error("Consultant Visit is required");
    if (Object.keys(serviceArray[0]).length === 0)
      throw new Error("Please fill first index");
    const childCheck = await serviceArray.map((items, i) => {
      if (![items.consultantName, items.charges].every(Boolean))
        throw new Error(`Empty Field / Error Found at line no ${i + 1}`);
    });
    let duplicateField = [];
    let uniqueField = [];
    const dupCheck = await serviceArray.forEach((items) => {
      if (uniqueField.includes(items.consultantName)) {
        duplicateField.push(items.consultantName);
      } else {
        uniqueField.push(items.consultantName);
      }
      if (duplicateField.length > 0)
        throw new Error("Duplicate ConsultantName is Are Not Allowed.");
    });
    const createConsultantVisit = await model.create({
      erNo,
      mrNo,
      partyCode,
      patientName,
      gender,
      consultantVisit: serviceArray,
      internalService: serviceArray,
    });
    res.status(200).send({ data: createConsultantVisit });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ message: error.message });
  }
};
