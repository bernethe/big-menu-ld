import React, { useEffect, useState, useRef } from 'react'
import {FaReact} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'
import {ImArrowLeft2} from 'react-icons/im'
import './big-menu.scss'

const BigMenu = ({ dataProvider, isOpen, setIsOpen }) => {

	const backdropRef = useRef(null);
	const menuRef = useRef(null);
	const firstLevelRef = useRef(null);
	const secondLevelRef = useRef(null);

	const [secondLevel, setSecondLevel] = useState([]);
	const [thirdLevel, setThirdLevel] = useState([]);
	const [firstLevelVal, setFirstLevelVal] = useState(0);

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

	const handleClickFirstLevel = (e, item) => {
		if(window.matchMedia('(max-width: 768px)').matches && item.sub && item.sub.length > 0) {
			e.preventDefault();
			firstLevelRef.current.classList.add('big-menu-hide');
		}
	}
	const handleClickSecondLevel = (e, item) => {
		if(window.matchMedia('(max-width: 768px)').matches && item.sub && item.sub.length > 0) {
			e.preventDefault();
			firstLevelRef.current.classList.add('big-menu-hide');
			secondLevelRef.current.classList.add('big-menu-hide');
		}
	}

	const hoverSecondLevel = (e,item) => {
		document.querySelectorAll('.big-menu-firstlevel li a').forEach(el => el.classList.remove('active'));
		e.target.classList.add('active');
		setFirstLevelVal(item.sub ? item.id : 0);
		setSecondLevel(item.sub ? item.sub : []);
		setThirdLevel([]);
	}
	const outSecondLevel = () => {
		firstLevelRef.current.classList.remove('big-menu-hide');
		secondLevelRef.current.classList.remove('big-menu-hide');
		setSecondLevel([]);
	}

	const hoverThirdLevel = (e,item) => {
		document.querySelectorAll('.big-menu-sublevel li a').forEach(el => el.classList.remove('active-sub'));
		e.target.classList.add('active-sub');
		setThirdLevel(item.sub ? item.sub : []);
	}
	const outThirdLevel = () => {
		document.querySelectorAll('.big-menu-sublevel li a').forEach(el => el.classList.remove('active-sub'));
		secondLevelRef.current.classList.remove('big-menu-hide');
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
				<div className='big-menu-scroller big-menu-firstlevel' ref={firstLevelRef}>
					<ul style={ { height: `${40*dataProvider.length}px` } }>
						{dataProvider.map(item => <li
							key={'1_'+item.id}
							onMouseEnter={(e) => hoverSecondLevel(e,item)}
							onClick={(e) => handleClickFirstLevel(e, item)}
						>
							<a href={ `/ECOMMERCE/ItemCategory?id=${item.id}&subcategory=0` }>{item.name}</a>
						</li>)}
					</ul>
				</div>
				{
					secondLevel.length > 0 && <div className='big-menu-scroller big-menu-sublevel' ref={secondLevelRef}>
						<div className='big-menu-sublevel-subnav'>
							<button className='btn' onClick={ outSecondLevel }><ImArrowLeft2 /> REGRESAR</button>
						</div>
						<ul>
							{
								secondLevel.map(item => <li
									key={'2_'+item.id}
									onMouseEnter={(e) => hoverThirdLevel(e,item)}
									onClick={(e) => handleClickSecondLevel(e, item)}
								>
									<a href={ `/ECOMMERCE/ItemCategory?id=${firstLevelVal}&subcategory=${item.id}` }>{item.name}</a>
								</li>)
							}
						</ul>
					</div>
				}
				{
					thirdLevel.length > 0 && <div className='big-menu-scroller big-menu-sublevel' onMouseLeave={ outThirdLevel }>
						<div className='big-menu-sublevel-subnav'>
							<button className='btn' onClick={ outThirdLevel }><ImArrowLeft2 /> REGRESAR</button>
						</div>
						<ul>
							{
								thirdLevel.map(item => <li
									key={'3_'+item.id}
								>
									<a href={ `/ECOMMERCE/ItemCategory?id=${firstLevelVal}&subcategory=${item.id}` }>{item.name}</a>
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