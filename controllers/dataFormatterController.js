exports.textToNumber = async (req, res) => {
  try {
    const number = parseFloat(req.body.value);
    res.status(200).json({
      "outputFields": {
        "numberOutput": number,
        "hs_execution_state": "SUCCESS"
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.numberToText = async (req, res) => {
  try {
    const text = req.body.value.toString();
    res.status(200).json({
      "outputFields": {
        "Converted_Text": text,
        "hs_execution_state": "SUCCESS"
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.wholeNumber = async (req, res) => {
  try {
    const value = parseFloat(req.body.value);
    const wholeNumber = (value % 1) < 0.50 ? Math.floor(value) : Math.ceil(value);
    res.status(200).json({
      "outputFields": {
        "numberOutput": wholeNumber,
        "hs_execution_state": "SUCCESS"
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


exports.addNumbers = async (req, res) => {
  try {
    const { value_one, value_two } = req.body;
    const sum = parseFloat(value_one) + parseFloat(value_two);
    res.status(200).json({
      "outputFields": {
        "Sum_Output": sum,
        "hs_execution_state": "SUCCESS"
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.subtractNumbers = async (req, res) => {
  try {
    const { value_one, value_two } = req.body;
    const difference = parseFloat(value_one) - parseFloat(value_two);
    res.status(200).json({
      "outputFields": {
        "Difference_Output": difference,
        "hs_execution_state": "SUCCESS"
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};