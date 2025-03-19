
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import TwinProfile from '@/components/twin/TwinProfile';

const Profile = () => {
  return (
    <>
      <Header />
      <PageTransition>
        <main className="container-fluid py-8 mt-2">
          <div className="mb-8">
            <h1 className="font-bold">Digital Twin Profile</h1>
            <p className="text-muted-foreground mt-1">
              Customize your financial digital twin to improve predictions
            </p>
          </div>

          <TwinProfile />
        </main>
      </PageTransition>
    </>
  );
};

export default Profile;
