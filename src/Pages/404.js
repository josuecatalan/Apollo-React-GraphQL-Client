import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NotFoundImg from '../Images/404.png';

const NotFound = ({ history }) => {
	const MySwal = withReactContent(Swal);
	let timerInterval;
	MySwal.fire({
		type: 'error',
		title: 'Oops...Page not found!',
		text: 'Something went wrong!',
		html: 'You will be redirected to Home page in <strong>5</strong> seconds.',
		imageUrl: NotFoundImg,
		imageWidth: 400,
		imageHeight: 200,
		imageAlt: '404 image',
		animation: false,
		customClass: {
			popup: 'animated shake'
		},
		timer: 5000,
		onBeforeOpen: () => {
			Swal.showLoading();
			timerInterval = setInterval(() => {
				Swal.getContent().getElementsByClassName('seconds').textContent = (
					Swal.getTimerLeft() / 1000
				).toFixed(0);
			}, 100);
		},
		onClose: () => {
			clearInterval(timerInterval);
			history.push('/');
		}
	});
	return null;
};

export default NotFound;
