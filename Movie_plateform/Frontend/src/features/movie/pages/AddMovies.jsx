import React, { useState } from 'react';
import { createMovie } from '../services/movie.api';
import '../styles/addMovies.scss';
import { useMovies } from '../hooks/useMovies';
import { useNavigate } from 'react-router';

const AddMovies = () => {
    // Form States
    const {handleCreateMovie} = useMovies()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        releaseDate: '',
        genre: '',
        rating: 9,
        movieFile: null,
        coverFile: null,
    });

    // UI States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [moviePreview, setMoviePreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);

    // Genres list
    const genresList = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Adventure', 'Fantasy', 'Animation'];
    const ratingsList = [7,8,9,5,6];

    // Validate form
    const validateForm = () => {
        const errors = {};

        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.description.trim()) errors.description = 'Description is required';
        if (!formData.releaseDate) errors.releaseDate = 'Release date is required';
        if (!formData.genre) errors.genre = 'Genre is required';
        if (!formData.movieFile) errors.movieFile = 'Movie file is required';
        if (!formData.coverFile) errors.coverFile = 'Cover image is required';

        if (formData.description.length < 20) errors.description = 'Description must be at least 20 characters';
        if (formData.title.length > 100) errors.title = 'Title must not exceed 100 characters';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle text input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle movie file upload
    const handleMovieFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024 * 1024) { // 2GB limit
                setFormErrors(prev => ({
                    ...prev,
                    movieFile: 'Movie file must be less than 2GB'
                }));
                return;
            }
            if (!file.type.includes('video')) {
                setFormErrors(prev => ({
                    ...prev,
                    movieFile: 'Please select a valid video file'
                }));
                return;
            }
            setFormData(prev => ({
                ...prev,
                movieFile: file
            }));
            setMoviePreview({
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                type: file.type
            });
            setFormErrors(prev => ({
                ...prev,
                movieFile: ''
            }));
        }
    };

    // Handle cover file upload
    const handleCoverFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) { // 50MB limit
                setFormErrors(prev => ({
                    ...prev,
                    coverFile: 'Cover image must be less than 50MB'
                }));
                return;
            }
            if (!file.type.includes('image')) {
                setFormErrors(prev => ({
                    ...prev,
                    coverFile: 'Please select a valid image file'
                }));
                return;
            }
            setFormData(prev => ({
                ...prev,
                coverFile: file
            }));

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverPreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setFormErrors(prev => ({
                ...prev,
                coverFile: ''
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setError('Please fix the errors above');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);
        setUploadProgress(0);

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) clearInterval(progressInterval);
                    return Math.min(prev + Math.random() * 30, 90);
                });
            }, 500);

            const response = await handleCreateMovie( {
                title: formData.title,
                description: formData.description,
                releaseDate: formData.releaseDate,
                genre: formData.genre,
                rating: formData.rating,
                movieFile: formData.movieFile,
                coverFile: formData.coverFile,
                duration: 3,
            });
            // console.log(response);
            if(response && response.success !== false) {
                navigate("/");
            }else {
                setError("Something wrong in saving movie. Please try again.");
            }
            clearInterval(progressInterval);
            setUploadProgress(100);

            setSuccess(true);
            setSuccessMessage(`"${formData.title}" has been successfully added to the platform!`);

            // Reset form
            setTimeout(() => {
                setFormData({
                    title: '',
                    description: '',
                    releaseDate: '',
                    genre: '',
                    rating: '9',
                    movieFile: null,
                    coverFile: null,
                });
                setMoviePreview(null);
                setCoverPreview(null);
                setSuccess(false);
                setUploadProgress(0);
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add movie. Please try again.');
            console.log(error);
            
            setUploadProgress(0);
        } finally {
            setLoading(false);
        }
    };

    // Clear all
    const handleClearForm = () => {
        setFormData({
            title: '',
            description: '',
            releaseDate: '',
            genre: '',
            rating: 'PG-13',
            movieFile: null,
            coverFile: null,
        });
        setMoviePreview(null);
        setCoverPreview(null);
        setFormErrors({});
        setError(null);
        setSuccess(false);
    };

    return (
        <div className="add-movies-container">
            <div className="add-movies-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <span className="title-icon">🎬</span>
                        Add New Movie
                    </h1>
                    <p className="page-subtitle">Upload and manage movies on your platform</p>
                </div>
            </div>

            {/* Success State */}
            {success && (
                <div className="alert alert-success">
                    <div className="alert-icon">✓</div>
                    <div className="alert-content">
                        <h3>Success!</h3>
                        <p>{successMessage}</p>
                    </div>
                    {uploadProgress === 100 && (
                        <div className="success-animation">
                            <div className="confetti"></div>
                        </div>
                    )}
                </div>
            )}

            {/* Error State */}
            {error && !success && (
                <div className="alert alert-error">
                    <div className="alert-icon">⚠️</div>
                    <div className="alert-content">
                        <h3>Error</h3>
                        <p>{error}</p>
                    </div>
                </div>
            )}

            {/* Loading Progress */}
            {loading && (
                <div className="upload-progress">
                    <div className="progress-content">
                        <div className="spinner"></div>
                        <h3>Uploading Movie...</h3>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <p>{Math.floor(uploadProgress)}% Complete</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="add-movies-form">
                <div className="form-grid">
                    {/* Left Column - Text Inputs */}
                    <div className="form-column">
                        <div className="form-section">
                            <h2 className="section-title">Movie Information</h2>

                            {/* Title */}
                            <div className="form-group">
                                <label htmlFor="title" className="form-label">
                                    Movie Title <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter movie title"
                                    className={`form-input ${formErrors.title ? 'error' : ''}`}
                                    disabled={loading}
                                    maxLength={100}
                                />
                                <div className="input-helper">
                                    <span className="char-count">{formData.title.length}/100</span>
                                    {formErrors.title && <span className="error-text">{formErrors.title}</span>}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label htmlFor="description" className="form-label">
                                    Description <span className="required">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter movie description"
                                    className={`form-textarea ${formErrors.description ? 'error' : ''}`}
                                    disabled={loading}
                                    maxLength={1000}
                                    rows={5}
                                />
                                <div className="input-helper">
                                    <span className="char-count">{formData.description.length}/1000</span>
                                    {formErrors.description && <span className="error-text">{formErrors.description}</span>}
                                </div>
                            </div>

                            {/* Release Date & Rating */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="releaseDate" className="form-label">
                                        Release Date <span className="required">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="releaseDate"
                                        name="releaseDate"
                                        value={formData.releaseDate}
                                        onChange={handleInputChange}
                                        className={`form-input ${formErrors.releaseDate ? 'error' : ''}`}
                                        disabled={loading}
                                    />
                                    {formErrors.releaseDate && <span className="error-text">{formErrors.releaseDate}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="rating" className="form-label">
                                        Rating <span className="required">*</span>
                                    </label>
                                    <select
                                        id="rating"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        className="form-select"
                                        disabled={loading}
                                    >
                                        {ratingsList.map(rating => (
                                            <option key={rating} value={rating}>{rating}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Genre */}
                            <div className="form-group">
                                <label htmlFor="genre" className="form-label">
                                    Genre <span className="required">*</span>
                                </label>
                                <select
                                    id="genre"
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                    className={`form-select ${formErrors.genre ? 'error' : ''}`}
                                    disabled={loading}
                                >
                                    <option value="">Select a genre</option>
                                    {genresList.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                                {formErrors.genre && <span className="error-text">{formErrors.genre}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - File Uploads */}
                    <div className="form-column">
                        <div className="form-section">
                            <h2 className="section-title">Media Files</h2>

                            {/* Movie File Upload */}
                            <div className="form-group">
                                <label htmlFor="movieFile" className="form-label">
                                    Movie File <span className="required">*</span>
                                </label>
                                <div className={`file-upload-area ${moviePreview ? 'has-file' : ''} ${formErrors.movieFile ? 'error' : ''}`}>
                                    {!moviePreview ? (
                                        <label htmlFor="movieFile" className="upload-label">
                                            <div className="upload-icon">🎥</div>
                                            <p className="upload-text">Drag & drop your movie or click to browse</p>
                                            <p className="upload-hint">Max 2GB • Video formats supported</p>
                                        </label>
                                    ) : (
                                        <div className="file-info">
                                            <div className="file-icon">✓</div>
                                            <div className="file-details">
                                                <p className="file-name">{moviePreview.name}</p>
                                                <p className="file-size">{moviePreview.size}</p>
                                            </div>
                                            <button
                                                type="button"
                                                className="file-remove-btn"
                                                onClick={() => {
                                                    setMoviePreview(null);
                                                    setFormData(prev => ({ ...prev, movieFile: null }));
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="movieFile"
                                        onChange={handleMovieFileChange}
                                        accept="video/*"
                                        disabled={loading}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                {formErrors.movieFile && <span className="error-text">{formErrors.movieFile}</span>}
                            </div>

                            {/* Cover Image Upload */}
                            <div className="form-group">
                                <label htmlFor="coverFile" className="form-label">
                                    Cover Image <span className="required">*</span>
                                </label>
                                <div className={`file-upload-area ${coverPreview ? 'has-file' : ''} ${formErrors.coverFile ? 'error' : ''}`}>
                                    {!coverPreview ? (
                                        <label htmlFor="coverFile" className="upload-label">
                                            <div className="upload-icon">🖼️</div>
                                            <p className="upload-text">Drag & drop your cover or click to browse</p>
                                            <p className="upload-hint">Max 50MB • JPG, PNG, WebP supported</p>
                                        </label>
                                    ) : (
                                        <div className="cover-preview">
                                            <img src={coverPreview} alt="Cover preview" />
                                            <button
                                                type="button"
                                                className="file-remove-btn"
                                                onClick={() => {
                                                    setCoverPreview(null);
                                                    setFormData(prev => ({ ...prev, coverFile: null }));
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="coverFile"
                                        onChange={handleCoverFileChange}
                                        accept="image/*"
                                        disabled={loading}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                {formErrors.coverFile && <span className="error-text">{formErrors.coverFile}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : '🚀 Add Movie'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClearForm}
                        disabled={loading}
                    >
                        Clear Form
                    </button>
                </div>
            </form>

            {/* Info Cards */}
            <div className="info-section">
                <div className="info-card">
                    <div className="info-icon">📋</div>
                    <h3>Requirements</h3>
                    <ul>
                        <li>Movie file: MP4, MKV, WebM (max 2GB)</li>
                        <li>Cover image: JPG, PNG, WebP (max 50MB)</li>
                        <li>Title: Max 100 characters</li>
                        <li>Description: 20-1000 characters</li>
                    </ul>
                </div>
                <div className="info-card">
                    <div className="info-icon">💡</div>
                    <h3>Tips</h3>
                    <ul>
                        <li>Use descriptive movie titles</li>
                        <li>High-quality cover images look better</li>
                        <li>Write engaging descriptions</li>
                        <li>Choose appropriate ratings</li>
                    </ul>
                </div>
                <div className="info-card">
                    <div className="info-icon">✨</div>
                    <h3>Best Practices</h3>
                    <ul>
                        <li>Optimize videos before uploading</li>
                        <li>Use consistent cover dimensions</li>
                        <li>Include detailed descriptions</li>
                        <li>Add relevant genre tags</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddMovies;
