import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
    uploaderId: {type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true},
    uploader_name: { type: String, required: true },
    upload_title: { type: String, required: true },
    video_path: { type: String, required: true },
    thumbnail_path: { type: String, required: true }
  }, {
    timestamps: true,
  });



const uploadSchema = mongoose.Schema({
  screenId: {type: mongoose.Schema.Types.ObjectId, 
  ref: 'Screen',
  required: true},
  playlist: [videoSchema]
}, {
  timestamps: true,
});

const Playlist = mongoose.model('Playlist', uploadSchema);
const video = mongoose.model('videos',videoSchema);

export default Playlist;
export {video};