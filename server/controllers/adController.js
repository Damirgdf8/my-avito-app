const Ad = require('../models/Ad');

exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.findAll({ where: { userId: req.user.userId } });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ads', error: error.message });
  }
};

exports.createAd = async (req, res) => {
  const { title, description, otherParams } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const ad = await Ad.create({
      userId: req.user.userId,
      title,
      description,
      otherParams
    });
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ad', error: error.message });
  }
};

exports.updateAd = async (req, res) => {
  const { id } = req.params;
  const { title, description, otherParams } = req.body;

  try {
    const ad = await Ad.findByPk(id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    ad.title = title || ad.title;
    ad.description = description || ad.description;
    ad.otherParams = otherParams || ad.otherParams;
    await ad.save();

    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ad', error: error.message });
  }
};

exports.deleteAd = async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await Ad.findByPk(id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    await ad.destroy();
    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ad', error: error.message });
  }
};
