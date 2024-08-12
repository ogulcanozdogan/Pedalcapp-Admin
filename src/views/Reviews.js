import HeaderWithoutCards from 'components/Headers/HeaderWithoutCards';
import React from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Container,
	Row,
} from 'reactstrap';

const ReviewCard = ({ review }) => {
	return (
		<Card className='shadow'>
			<CardHeader>
				<div className='d-flex align-items-center'>
					{review.customerName}
					<div className='d-flex align-items-center ml-auto'>
						<span className='mr-3'>{review.star}/5</span>
						{[
							...new Array(review.star).fill(1),
							...new Array(5 - review.star).fill(0),
						].map(value =>
							value === 1 ? (
								<i className='fas fa-star'></i>
							) : (
								<i className='fas fa-star text-muted'></i>
							)
						)}
					</div>
				</div>
			</CardHeader>
			<CardBody>
				<p>{review.review}</p>
			</CardBody>
		</Card>
	);
};

const Reviews = () => {
	return (
		<>
			<HeaderWithoutCards />
			<Container className='mt--7 pb-4' fluid>
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='bg-transparent d-flex align-items-center'>
								<div className='d-flex align-items-center'>
									<Button
										tag={Link}
										to='/admin/drivers'
										color='dark'
									>
										<i class='fas fa-angle-left'></i>
									</Button>
									<h3 className='mb-0'>Reviews</h3>
								</div>
							</CardHeader>
							<CardBody
								className='d-flex flex-column'
								style={{ gap: '25px' }}
							>
								<ReviewCard
									review={{
										customerName: 'Ali',
										star: 4,
										review: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam at quam nemo fugiat atque, modi maxime natus recusandae esse voluptates quo facilis explicabo porro a sapiente reiciendis? Ab, autem dolor! Vero omnis quaerat natus rerum, quasi autem dolorum maiores. Cum, doloribus quod non debitis eveniet velit. Veritatis laborum cum in illum nam! Error culpa debitis cumque tenetur esse, assumenda dolores. Recusandae suscipit ipsa maxime consequatur ipsam, dolor dolores itaque nesciunt dolore eaque obcaecati eum incidunt quam odit et sunt molestias culpa. Molestias ut iure dolore suscipit laudantium, aliquam quidem vitae! Placeat ex odit, amet commodi expedita officiis quos nesciunt repudiandae, itaque quod hic tempore vel? Laudantium nihil quia non aspernatur nostrum omnis nobis quo totam! Excepturi quia quibusdam cupiditate doloremque? Tempore vitae dignissimos, deleniti beatae, quia obcaecati amet aliquam, recusandae provident sed exercitationem! Amet pariatur dolores praesentium nobis dolor expedita. Officia officiis natus cumque illum explicabo dolorem error sequi doloremque! Cum facere omnis, quidem quaerat incidunt facilis similique, natus asperiores fugiat qui quas. Nulla eum animi, dignissimos itaque praesentium illo distinctio qui delectus veritatis quas provident saepe ipsum accusantium adipisci! Autem pariatur eveniet exercitationem, voluptatem ratione ipsum in illo debitis, enim id asperiores omnis quam dolor sunt',
									}}
								/>
								<ReviewCard
									review={{
										customerName: 'Usman',
										star: 5,
										review: 'vitae facere quisquam dolores consequuntur explicabo saepe ipsam. Commodi ullam vel provident magni. Saepe quas, quasi ratione tempora, error, sunt sequi cupiditate maxime eaque aut possimus itaque obcaecati a veritatis fugiat. Ipsa perspiciatis rem cum repellat, temporibus doloribus id. Totam provident ab beatae! Voluptate nihil dolor totam accusamus est repellendus quisquam ducimus repellat explicabo illo, nulla sint veritatis id nobis. Quae aspernatur ea recusandae repudiandae hic illum eveniet autem nihil? Veniam, praesentium iste. Asperiores expedita iste ratione sed facilis odio blanditiis quidem, impedit culpa omnis rem minus cupiditate dolorem suscipit quibusdam fugit. Non vel cupiditate culpa dolorum, eveniet id sunt dolores voluptatum impedit.',
									}}
								/>
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default Reviews;
