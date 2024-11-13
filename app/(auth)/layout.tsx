type Props = {
  children: React.ReactNode
}

const AuthLayout = ({children}:Props) => {
  return ( 
    <div className="h-full flex items-center justify-center bg-gradient-to-tr from-teal-600 to-blue-600/10">
      {children}
    </div>
   );
}
 
export default AuthLayout;