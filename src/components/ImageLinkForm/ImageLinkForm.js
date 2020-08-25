import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return(
		<div>
			<p className='f3'>
			{'This Magic Brain will detect faces in your pictures. Enter the URL of the picture and give it a try.'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-2'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
					<button
					className='w-30 grow f4 b--none white bg'
					onClick={onButtonSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;
