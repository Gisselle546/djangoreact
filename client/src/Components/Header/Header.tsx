"use client";

import React from "react";
import logo from "../../assets/images/logo-grey.png";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

import { useStore } from "@/context/cart";
import Link from "next/dist/client/link";
import { Search } from "@/redux/reducer/filterSlice";
import Searchbar from "../Searchbar/Searchbar";

function HeaderContainer() {
  const router = useRouter();
  const { state } = useStore();
  const count = state.cart?.length ?? 0;
  const handleClick = (data: string) => {
    router.push(`/${data}`);
  };

  /* const StyledIcon = styled(FiShoppingCart)`
  vertical-align: middle;
  margin-right: 0.2rem;
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;

  @media (max-width: 768px) {
   font-size: 1rem;
   margin-top: 0.2rem;
  }
`;
 */

  return (
    /*    <HeaderContainer>
         <LogoContainer img={logo.src} onClick={()=>router.push('/')}/>
         <ListItems>
            <ListItem onClick={()=>handleClick('footwear')}>Footwear</ListItem>
            <ListItem onClick={()=>handleClick('players')}>Players</ListItem>
            <ListItem onClick={()=>handleClick('clubs')}>Clubs</ListItem>
            <ListItem onClick={()=>handleClick('national')}>National Teams</ListItem>
         </ListItems>
         <AuthContain>
          <div>
          <StyledIcon onClick={()=>handleClick('cart')}/>
            <CartLength>{state.cart.length}</CartLength>
          </div>
         </AuthContain>
   </HeaderContainer> */

    <header className="sticky top-0 z-40 border-b border-emerald-600 backdrop-blur">
      <div className="page-container relative py-3 flex items-center justify-between gap-6">
        <Link href="/" className="font-semibold">
          <img src={logo.src} alt="Logo" className="h-10 w-auto" />
        </Link>
        <nav className="text-md text-slate-600 flex gap-4">
          <Link className="font-head font-bold" href="/footwear">
            Footwear
          </Link>
          <Link className="font-head font-bold" href="/players">
            Players
          </Link>
          <Link className="font-head  font-bold" href="/clubs">
            Clubs
          </Link>
          <Link className="font-head font-bold" href="/national">
            National Teams
          </Link>
        </nav>
        <Searchbar className="right-24 top-1/2 -translate-y-1/2" />
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="relative inline-flex items-center justify-center p-2 rounded hover:bg-slate-100 transition"
          aria-label="Cart"
        >
          <FiShoppingCart size={22} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[11px] font-medium flex items-center justify-center leading-none">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default HeaderContainer;
