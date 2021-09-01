import React from "react";
import { useHistory } from "react-router-dom";
import "./stylePages/styleInformation.css";
import { HeaderMain, Footer, Sidebar } from "../components";
import { ReactSVG, LogoGoTrueNetArrow, IconUseArrow } from "../images";
import { NavLink } from "react-router-dom";

function Information() {
    const infoTopRef = React.useRef(null);
    const infoRegRef = React.useRef(null);
    const infoSubRef = React.useRef(null);

    const history = useHistory();

    React.useEffect(() => {
        const hach = history.location.hash;
        const scrollParams = { behavior: "smooth", block: "start" };

        if (hach === "#info_top") {
            return infoTopRef.current.scrollIntoView(scrollParams);
        }
        if (hach === "#info_reg") {
            return infoRegRef.current.scrollIntoView(scrollParams);
        }
        if (hach === "#info_sub") {
            return infoSubRef.current.scrollIntoView(scrollParams);
        }
    }, [history.location.hash]);

    return (
        <div className="wrapper info_wrapper">
            <Sidebar />

            <div className="main">
                <div className="header-fix">
                    <HeaderMain />

                    <div
                        className="info_block__line block__line__logo"
                        id="info_top"
                        ref={infoTopRef}
                    >
                        <div className="info_block__line__main">
                            <NavLink to="/" className="info-logo-nav">
                                <ReactSVG src={LogoGoTrueNetArrow} className="logo__res" />
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="info_block__line block__line__about">
                    <div className="info_block__line__main">
                        <h2>О проекте</h2>
                        <div className="snip">Отличительные особенности Gotruenet</div>

                        <div className="info_block__line_txt">
                            <p className="info_block__line_title">
                                <b>Поиск информации в разрезе актуальных поисковиков</b>
                            </p>

                            <p>
                                Практический опыт показывает, что начало повседневной работы по
                                формированию позиции обеспечивает актуальность ключевых компонентов
                                планируемого обновления. Разнообразный и богатый опыт курс напрямую
                                зависит от позиций, занимаемых участниками в отношении поставленных
                                задач!
                            </p>

                            <p>
                                Задача организации, в особенности же рамки и место обучения кадров в
                                значительной степени...
                            </p>
                        </div>

                        <div className="snip">Инструкция пользования</div>

                        <div className="i-use">
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info_block__line " id="info_ecdbdb">
                    <div className="info_block__line__main">
                        <h2>О проекте</h2>
                        <h2>О проекте</h2>
                        <h2>О проекте</h2>
                        <div className="snip">Отличительные особенности Gotruenet</div>
                        <div className="snip">Отличительные особенности Gotruenet</div>
                        <div className="snip">Отличительные особенности Gotruenet</div>

                        <div className="info_block__line_txt">
                            <p className="info_block__line_title">
                                <b>Поиск информации в разрезе актуальных поисковиков</b>
                            </p>

                            <p class="mb17">
                                Практический опыт показывает, что начало повседневной работы по
                                формированию позиции обеспечивает актуальность ключевых компонентов
                                планируемого обновления. Разнообразный и богатый опыт курс напрямую
                                зависит от позиций, занимаемых участниками в отношении поставленных
                                задач!
                            </p>

                            <p className="info_block__line_title">
                                <b>Поиск информации в разрезе актуальных поисковиков</b>
                            </p>

                            <p>
                                Практический опыт показывает, что начало повседневной работы по
                                формированию позиции обеспечивает актуальность ключевых компонентов
                                планируемого обновления. Разнообразный и богатый опыт курс напрямую
                                зависит от позиций, занимаемых участниками в отношении поставленных
                                задач!
                            </p>

                            <p>
                                Задача организации, в особенности же рамки и место обучения кадров в
                                значительной степени...
                            </p>
                        </div>

                        <div className="i-use">
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                        </div>

                        <div className="i-use">
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                        </div>

                        <div className="i-use">
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info_block__line " id="info_aca6a6">
                    <div className="info_block__line__main">
                        <h2>О проекте</h2>
                        <div className="snip">Отличительные особенности Gotruenet</div>

                        <div className="info_block__line_txt">
                            <p className="info_block__line_title">
                                <b>Поиск информации в разрезе актуальных поисковиков</b>
                            </p>

                            <p>
                                Практический опыт показывает, что начало повседневной работы по
                                формированию позиции обеспечивает актуальность ключевых компонентов
                                планируемого обновления. Разнообразный и богатый опыт курс напрямую
                                зависит от позиций, занимаемых участниками в отношении поставленных
                                задач!
                            </p>

                            <p>
                                Задача организации, в особенности же рамки и место обучения кадров в
                                значительной степени...
                            </p>
                        </div>

                        <div className="snip">Инструкция пользования</div>

                        <div className="i-use">
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                        </div>

                        <div className="info_block__line_txt">
                            <p className="info_block__line_title">
                                <b>Поиск информации в разрезе актуальных поисковиков</b>
                            </p>

                            <p>
                                Объединение Польши и Литвы в одно государство сделало возможным их
                                совместные контрнаступательные действия. России с трудом удалось
                                отстоять Псков (1582). Ливонская война, в ходе которой впервые
                                русская армия держалась под знамёнами подряд много лет, вместе с
                                опричниной ударила по экономике и привела к потере Россией выхода к
                                Балтийскому морю.
                            </p>
                        </div>

                        <div className="snip">Инструкция пользования</div>

                        <div className="i-use">
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                        </div>

                        <div className="snip">Инструкция пользования</div>

                        <div className="i-use">
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Вводим запрос в поисковую строку</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем язык интерфейса</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>Выбираем вид поисковой системы</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="info_block__line info_block__line_reg"
                    id="info_red"
                    ref={infoRegRef}
                >
                    <div className="info_block__line__main">
                        <div className="snip">Регистрация</div>

                        <div className="info_block__line_txt">
                            <p className="info_block__line_title">
                                <b>Получите больше возможностей!</b>
                            </p>

                            <p>
                                Практический опыт показывает, что начало повседневной работы по
                                формированию позиции обеспечивает актуальность ключевых компонентов
                                планируемого обновления. Разнообразный и богатый опыт курс напрямую
                                зависит от позиций, занимаемых участниками в отношении поставленных
                                задач!
                            </p>

                            <p>
                                Задача организации, в особенности же рамки и место обучения кадров в
                                значительной степени...
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="info_block__line info_block__line_reg"
                    id="info_60a8ad"
                    ref={infoRegRef}
                >
                    <div className="info_block__line__main">
                        <div className="snip">Регистрация</div>
                        <div className="snip">Регистрация</div>
                        <div className="snip">Регистрация</div>

                        <div className="info_block__line_txt">
                            <p className="info_block__line_title">
                                <b>Получите больше возможностей!</b>
                            </p>

                            <p>
                                Практический опыт показывает, что начало повседневной работы по
                                формированию позиции обеспечивает актуальность ключевых компонентов
                                планируемого обновления. Разнообразный и богатый опыт курс напрямую
                                зависит от позиций, занимаемых участниками в отношении поставленных
                                задач!
                            </p>

                            <p>
                                Задача организации, в особенности же рамки и место обучения кадров в
                                значительной степени...
                            </p>
                        </div>
                    </div>
                </div>

                <div className="info_block__line block__line__sub" id="info_sub" ref={infoSubRef}>
                    <div className="info_block__line__main">
                        <div className="snip">Подписка</div>

                        <div className="colum">
                            <div className="colum_elem">
                                <div className="info_block__line_txt">
                                    <p className="info_block__line_title">
                                        <b>Прямо сейчас Вы можете оформить подписку!</b>
                                    </p>

                                    <p>
                                        Пользователи, оформившие подписку смогут получить все
                                        преимущества.................... полноценно использовать наш
                                        сервис Gotruenet.................... опыт показывает, что
                                        начало повседневной работы по формированию позиции
                                        обеспечивает актуальность ключевых компонентов планируемого
                                        обновления.{" "}
                                    </p>
                                </div>
                            </div>
                            <div className="colum_elem">
                                <div className="i-use i-use_num">
                                    <p className="info_block__line_title">
                                        <b>Что необходимо сделать?</b>
                                    </p>
                                    <div className="i-use-elem">
                                        <span className="i-use_ellipse">1</span>
                                        <span>Вводим запрос в поисковую строку</span>
                                    </div>
                                    <div className="i-use-elem">
                                        <span className="i-use_ellipse">2</span>
                                        <span>Выбираем язык интерфейса</span>
                                    </div>
                                    <div className="i-use-elem">
                                        <span className="i-use_ellipse">3</span>
                                        <span>Выбираем вид поисковой системы</span>
                                    </div>
                                </div>
                                <div className="subscribe-now_mob">
                                    <button className="btn subscribe-now">Оформить подписку</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default React.memo(Information);
