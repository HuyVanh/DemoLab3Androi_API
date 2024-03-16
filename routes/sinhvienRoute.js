const express = require('express');
const router = express.Router();
const sinhvienModel = require('../models/sinhvienModel');

// GET route để lấy tất cả sinh viên
router.get('/', async(req, res) => {
    try {
        const sinhviens = await sinhvienModel.find(); // Lấy tất cả sinh viên từ cơ sở dữ liệu
        res.render('sinhviens', { sinhviens: sinhviens }); // Trả về trang 'sinhviens' và truyền dữ liệu sinh viên vào
    } catch (error) {
        console.error(error);
        res.json({ error: error });
    }
});

// POST route để tạo một sinh viên mới
router.post('/sinhvien', async(req, res) => {
    try {
        const { id, name } = req.body; // Lấy dữ liệu từ người dùng từ React Native
        const newSinhVien = new sinhvienModel({ id, name }); // Tạo một instance mới của SinhVienModel với dữ liệu nhận được
        await newSinhVien.save(); // Lưu vào cơ sở dữ liệu
        res.json(newSinhVien); // Trả về kết quả
        console.log(newSinhVien);
    } catch (error) {
        console.error(error);
        res.json({ error: error });
    }
});

// PUT route để cập nhật một sinh viên
router.put('/sinhvien/:_id', async(req, res) => {
    try {
        const _id = req.params._id;
        const { id, name } = req.body; // Lấy dữ liệu từ người dùng từ React Native
        const updateSinhVien = await sinhvienModel.findByIdAndUpdate(req.params._id, { id, name }, { new: true }); // Tìm và cập nhật sinh viên và trả về sinh viên đã cập nhật
        res.json(updateSinhVien); // Trả về kết quả
        console.log(updateSinhVien);
    } catch (error) {
        console.error(error);
        res.json({ error: error });
    }
});

// DELETE route để xóa một sinh viên
router.delete('/sinhvien/:_id', async(req, res) => {
    try {
        const _id = req.params._id;
        const deleteSinhVien = await sinhvienModel.findByIdAndDelete(req.params._id); // Tìm và xóa sinh viên
        res.json(deleteSinhVien); // Trả về kết quả
        console.log(deleteSinhVien);
    } catch (error) {
        console.error(error);
        res.json({ error: error });
    }
});

module.exports = router;
