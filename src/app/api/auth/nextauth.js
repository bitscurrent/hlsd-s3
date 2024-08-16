
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';



export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers here if needed
  ],
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page
    signOut: '/auth/signout', // Custom sign-out page
    error: '/auth/error', // Error page
    verifyRequest: '/auth/verify-request', // Verification request page
    newAccount: '/auth/new-account' // New account creation page
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Include user ID in session
      return session;
    },
  },
  // You can also add a database adapter here (if needed)


  
});


