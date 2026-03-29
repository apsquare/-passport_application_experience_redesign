import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const initialUser = {
  id: "",
  email: "",
  name: "",
  dob: "",
  city: "",
  phone: "",
  isLoggedIn: false,
};

const initialApplication = {
  personal: {
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
  },
  address: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  },
  identity: {
    aadhaar: "",
    pan: "",
    passportType: "Fresh Passport",
    reason: "",
  },
  documents: {
    photo: null,
    aadhaarFile: null,
    addressProof: null,
  },
  appointment: {
    center: "",
    date: "",
    slot: "",
  },
  status: "Draft",
  lastSavedAt: "",
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("passport_user");
    return savedUser ? JSON.parse(savedUser) : initialUser;
  });

  const [application, setApplication] = useState({ ...initialApplication });
  const [saveStatus, setSaveStatus] = useState("Saved");

  useEffect(() => {
    if (user?.isLoggedIn) {
      localStorage.setItem("passport_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("passport_user");
    }
  }, [user]);

  useEffect(() => {
    async function loadApplication() {
      if (!user?.isLoggedIn || !user?.id) {
        setApplication({ ...initialApplication });
        return;
      }

      try {
        const response = await fetch(`/api/application/${user.id}`);
        const data = await response.json();

        if (!response.ok) {
          setApplication({ ...initialApplication });
          return;
        }

        setApplication({
          ...initialApplication,
          ...data,
          personal: {
            ...initialApplication.personal,
            ...(data.personal || {}),
          },
          address: {
            ...initialApplication.address,
            ...(data.address || {}),
          },
          identity: {
            ...initialApplication.identity,
            ...(data.identity || {}),
          },
          documents: {
            ...initialApplication.documents,
            ...(data.documents || {}),
          },
          appointment: {
            ...initialApplication.appointment,
            ...(data.appointment || {}),
          },
        });
      } catch (error) {
        console.error("Failed to load application:", error);
        setApplication({ ...initialApplication });
      }
    }

    loadApplication();
  }, [user]);

  const register = async (newUser) => {
    try {
      const payload = {
        name: newUser.fullName || newUser.name || "",
        email: newUser.email?.trim().toLowerCase() || "",
        phone: newUser.phone || "",
        dob: newUser.dob || "",
        city: newUser.city || "",
        password: newUser.password || "",
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          error: data.error || "Registration failed.",
        };
      }

      return {
        ok: true,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Server error. Please try again.",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          error: data.error || "Invalid credentials.",
        };
      }

      const loggedInUser = {
        id: data.user.id,
        email: data.user.email || "",
        name: data.user.name || "",
        dob: data.user.dob || "",
        city: data.user.city || "",
        phone: data.user.phone || "",
        isLoggedIn: true,
      };

      setUser(loggedInUser);

      return {
        ok: true,
        user: loggedInUser,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Server error. Please try again.",
      };
    }
  };

  const logout = () => {
    setUser(initialUser);
    setApplication({ ...initialApplication });
    setSaveStatus("Saved");
    localStorage.removeItem("passport_user");
  };

  const updateUser = async (data) => {
    const updatedUser = {
      ...user,
      ...data,
    };

    setUser(updatedUser);

    return {
      ok: true,
      user: updatedUser,
    };
  };

  const updateApplicationSection = async (section, data) => {
    const updatedApplication = {
      ...application,
      [section]: {
        ...application[section],
        ...data,
      },
    };

    setApplication(updatedApplication);
    setSaveStatus("Saving...");

    try {
      const response = await fetch(`/api/application/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApplication),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setSaveStatus("Error");
        return {
          ok: false,
          error: responseData.error || "Could not save application.",
        };
      }

      const savedApplication = {
        ...updatedApplication,
        lastSavedAt: new Date().toLocaleString(),
      };

      setApplication(savedApplication);
      setSaveStatus("Saved");

      return {
        ok: true,
        data: responseData,
      };
    } catch (error) {
      setSaveStatus("Error");
      return {
        ok: false,
        error: "Server error. Could not save application.",
      };
    }
  };

  const submitApplication = async () => {
    if (!user?.id) {
      return {
        ok: false,
        error: "User not logged in.",
      };
    }

    try {
      const response = await fetch(`/api/application/${user.id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          error: data.error || "Submission failed.",
        };
      }

      setApplication((prev) => ({
        ...prev,
        status: "Submitted",
        applicationId: data.applicationId || prev.applicationId,
        submittedAt: data.submittedAt || new Date().toLocaleString(),
        lastSavedAt: data.lastSavedAt || new Date().toLocaleString(),
      }));

      return {
        ok: true,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Server error. Could not submit application.",
      };
    }
  };

  const getProgress = () => {
    let score = 0;

    if (application.personal.fullName && application.personal.mobile) {
      score += 20;
    }

    if (application.address.addressLine1 && application.address.city) {
      score += 20;
    }

    if (application.identity.aadhaar && application.identity.passportType) {
      score += 20;
    }

    if (
      application.documents.photo ||
      application.documents.aadhaarFile ||
      application.documents.addressProof
    ) {
      score += 20;
    }

    if (
      application.appointment.center &&
      application.appointment.date &&
      application.appointment.slot
    ) {
      score += 20;
    }

    return score;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateUser,
        application,
        updateApplicationSection,
        submitApplication,
        getProgress,
        saveStatus,
        setApplication,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
