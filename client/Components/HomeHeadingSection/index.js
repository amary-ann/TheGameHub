import Logo from "../Logo";
import NavButton from "../NavButton";

const HomeHeadingSection = (props) => {
    return (
        <section className="flex flex-row justify-between px-[30px] mt-[33px]">
            <Logo />
            <NavButton />
        </section>
    )
}

export default HomeHeadingSection;