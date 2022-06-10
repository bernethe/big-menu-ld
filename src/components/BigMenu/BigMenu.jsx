import React, { useEffect, useState, useRef } from 'react'
import {FaReact} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'
import './big-menu.scss'

const BigMenu = ({ dataProvider, isOpen, setIsOpen }) => {

	const backdropRef = useRef(null);
	const menuRef = useRef(null);

	const [secondLevel, setSecondLevel] = useState([]);
	const [thirdLevel, setThirdLevel] = useState([]);

	let timerCloser;

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			setSecondLevel([]);
			setThirdLevel([]);
			document.body.classList.remove('overflow-hidden');
		}
		clearTimeout(timerCloser);
	} , [isOpen]);

	const handleClose = (e) => {
		backdropRef.current.classList.add('close');
		menuRef.current.classList.add('close');
		setSecondLevel([]);
		setThirdLevel([]);
		timerCloser = setTimeout(() => {
			setIsOpen(false);
			clearTimeout(timerCloser);
		}, 250);
	}

	const hoverSecondLevel = (item) => {
		setSecondLevel(item.sub ? item.sub : []);
	}
	const outSecondLevel = () => {
		setSecondLevel([]);
	}

	const hoverThirdLevel = (item) => {
		setThirdLevel(item.sub ? item.sub : []);
	}
	const outThirdLevel = () => {
		setThirdLevel([]);
	}

	return isOpen ? <div className='big-menu'>
		<div className='backdrop' ref={backdropRef} onClick={ handleClose }></div>
		<nav ref={menuRef}>
			<header className='bg-primary bg-gradient text-white'>
				<div style={ { fontSize: '1.25em' } }>
					<FaReact style={ { fontSize: '1.5em' } } /> BigMenu
				</div>
				<button onClick={ handleClose } className='btn text-white'>
					<IoMdClose />
				</button>
			</header>
			<div className='big-menu-body'>
				<div className='big-menu-scroller'>
					<ul style={ { height: `${40*dataProvider.length}px` } }>
						{dataProvider.map(item => <li
							key={'1_'+item.id}
							onMouseEnter={() => hoverSecondLevel(item)}
						>
							<a href={ `/ECOMMERCE/ItemCategory?id=${item.id}&subcategory=0` }>{item.name}</a>
						</li>)}
					</ul>
				</div>
				{
					secondLevel.length > 0 && <div className='big-menu-scroller'>
						<ul>
							{
								secondLevel.map(item => <li
									key={'2_'+item.id}
									onMouseEnter={() => hoverThirdLevel(item)}
								>
									<a href={ `/ECOMMERCE/ItemCategory?id=${item.id}&subcategory=0` }>{item.name}</a>
								</li>)
							}
						</ul>
					</div>
				}
				{
					thirdLevel.length > 0 && <div className='big-menu-scroller' onMouseLeave={ outThirdLevel }>
						<ul>
							{
								thirdLevel.map(item => <li
									key={'3_'+item.id}
								>
									<a href={ `/ECOMMERCE/ItemCategory?id=${item.id}&subcategory=0` }>{item.name}</a>
								</li>)
							}
						</ul>
					</div>
				}
			</div>
		</nav>
	</div> : <></>
}

export default BigMenu