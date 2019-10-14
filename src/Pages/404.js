import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NotFoundImg from '../Images/404.png';

function NotFound({ history }) {
	const MySwal = withReactContent(Swal);
	let timerInterval;
	MySwal.fire({
		title: 'Oops...Page not found!',
		text: 'Something went wrong!',
		html: 'You will be redirected to Home page in <strong></strong> seconds.',
		imageUrl: NotFoundImg,
		heightAuto: true,
		width: 800,
		imageWidth: 800,
		imageHeight: 400,
		imageAlt: '404 image',
		animation: false,
		customClass: {
			popup: 'animated shake'
		},
		timer: 7000,
		onBeforeOpen: () => {
			Swal.showLoading();
			timerInterval = setInterval(() => {
				Swal.getContent().querySelector('strong').textContent = (
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
}

export default NotFound;
