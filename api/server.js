// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with specific database and app name
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected to my_database"))
.catch(err => console.log("MongoDB connection error:", err));

// Use existing collection without schema validation
const Patient = mongoose.model('patients', new mongoose.Schema({}, { 
  strict: false,
  collection: 'patients' 
}));

const MedicalData = mongoose.model('medical_data', new mongoose.Schema({}, { 
  strict: false,
  collection: 'medical_data' 
}));

// API endpoint to add a new patient
app.post('/api/patients', async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    const patientId = `P${(count + 1).toString().padStart(4, '0')}`;

    const patient = new Patient({
      patient_id: patientId,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      dob: req.body.dob,
      phone: req.body.phone,
      gender: req.body.gender,
      email: req.body.email,
      address: '', // Required by existing schema
      preferred_call_time: req.body.preferredTime
    });

    await patient.save();
    res.status(201).json({ success: true, patient });
  } catch (error) {
    console.error('Error saving patient:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint to fetch all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json({ success: true, patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint to fetch a specific patient by ID
app.get('/api/patients/:patientId', async (req, res) => {
  try {
    console.log('Searching for patient:', req.params.patientId);
    const patient = await Patient.findOne({ patient_id: req.params.patientId });
    console.log('Found patient:', patient);
    
    if (!patient) {
      return res.status(404).json({ 
        success: false, 
        message: `Patient with ID ${req.params.patientId} not found` 
      });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint to fetch all medical records
app.get('/api/medical/:patientId', async (req, res) => {
  try {
    const records = await MedicalData.find({ patient_id: req.params.patientId });
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching medical records:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint to add new medical record
app.post('/api/medical', async (req, res) => {
  try {
    // Generate unique hospitalization ID
    const count = await MedicalData.countDocuments();
    const hospitalizationId = `H${(count + 1).toString().padStart(4, '0')}`;

    const medicalRecord = new MedicalData({
      patient_id: req.body.patient_id,
      hospitalization_id: hospitalizationId,
      diagnosis: req.body.diagnosis,
      allergies: req.body.allergies,
      admit_date: req.body.admit_date,
      discharge_instructions: req.body.discharge_instructions || '',
      follow_up_app_date: req.body.follow_up_app_date || '', // Ensure this field is handled
      discharge_date: null // Add this to track discharge status
    });

    await medicalRecord.save();
    res.status(201).json({ success: true, medicalRecord });
  } catch (error) {
    console.error('Error adding medical record:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint to update medical record (for discharge)
app.put('/api/medical/:hospitalizationId', async (req, res) => {
  try {
    // Validate required fields for discharge
    if (!req.body.discharge_date || !req.body.discharge_instructions || !req.body.follow_up_app_date) {
      return res.status(400).json({
        success: false,
        message: 'Discharge date, instructions, and follow-up date are required'
      });
    }

    const medicalRecord = await MedicalData.findOneAndUpdate(
      { hospitalization_id: req.params.hospitalizationId },
      { 
        $set: {
          discharge_date: req.body.discharge_date,
          discharge_instructions: req.body.discharge_instructions,
          follow_up_app_date: req.body.follow_up_app_date // Ensure follow-up date is updated
        }
      },
      { new: true }
    );

    if (!medicalRecord) {
      return res.status(404).json({ 
        success: false, 
        message: 'Medical record not found' 
      });
    }

    res.status(200).json({ success: true, medicalRecord });
  } catch (error) {
    console.error('Error updating medical record:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
