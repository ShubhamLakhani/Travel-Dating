"use client";

import * as React from "react";
import Select, {
  components,
  DropdownIndicatorProps,
  OptionProps,
  StylesConfig,
} from "react-select";
import { Globe, ChevronDown, Check } from "lucide-react";
import { COUNTRIES } from "@/lib/data/countries";

export interface CountryOption {
  value: string; // Canonical country name e.g. "United States"
  label: string;
  code: string;
}

const COUNTRY_OPTIONS: readonly CountryOption[] = COUNTRIES.map((c) => ({
  value: c.name,
  label: c.name,
  code: c.code,
}));

interface CountrySelectProps {
  value: string;
  onChange: (countryName: string) => void;
  hasError?: boolean;
  errorMessageId?: string;
  disabled?: boolean;
}

/**
 * Custom Dropdown Indicator using Triply's design system ChevronDown
 */
function CustomDropdownIndicator(props: DropdownIndicatorProps<CountryOption, false>) {
  const { selectProps } = props;
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown
        className={`h-4 w-4 text-[var(--muted-foreground)] transition-transform duration-200 ${
          selectProps.menuIsOpen ? "rotate-180 text-[var(--primary)]" : ""
        }`}
        aria-hidden="true"
      />
    </components.DropdownIndicator>
  );
}

/**
 * Custom Option rendering with Triply soft surface accent and Coral selection
 */
function CustomOption(props: OptionProps<CountryOption, false>) {
  const { isSelected, isFocused, children, innerProps, innerRef } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center justify-between px-3.5 py-2.5 my-0.5 rounded-xl text-sm cursor-pointer transition-colors ${
        isSelected
          ? "bg-[var(--surface-muted)] text-[var(--primary)] font-bold"
          : isFocused
          ? "bg-[var(--surface-soft)] text-[var(--foreground)] font-medium"
          : "text-[var(--foreground)] font-medium hover:bg-[var(--surface-soft)]/60"
      }`}
    >
      <span>{children}</span>
      {isSelected && (
        <Check className="h-4 w-4 text-[var(--primary)] shrink-0 ml-2" aria-hidden="true" />
      )}
    </div>
  );
}

// Canonical React hook for hydration-safe client mounting check without cascading renders
function useIsMounted(): boolean {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function CountrySelect({
  value,
  onChange,
  hasError = false,
  errorMessageId,
  disabled = false,
}: CountrySelectProps) {
  const isMounted = useIsMounted();

  const selectedOption =
    COUNTRY_OPTIONS.find((opt) => opt.value === value) || null;

  const customStyles: StylesConfig<CountryOption, false> = {
    control: (base, state) => ({
      ...base,
      minHeight: "48px",
      height: "48px",
      borderRadius: "16px",
      backgroundColor: "var(--surface)",
      borderColor: hasError
        ? "#EF4444"
        : state.isFocused
        ? "var(--primary)"
        : "var(--border)",
      boxShadow: hasError
        ? "0 0 0 2px rgba(239, 68, 68, 0.2)"
        : state.isFocused
        ? "0 0 0 2px rgba(255, 98, 87, 0.2)"
        : "none",
      "&:hover": {
        borderColor: hasError
          ? "#EF4444"
          : state.isFocused
          ? "var(--primary)"
          : "var(--border)",
      },
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.15s ease",
    }),
    valueContainer: (base) => ({
      ...base,
      height: "48px",
      padding: "0 8px 0 44px", // 44px accounts for left Globe icon
      display: "flex",
      alignItems: "center",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: "var(--foreground)",
      fontSize: "14px",
      fontWeight: "500",
    }),
    placeholder: (base) => ({
      ...base,
      margin: 0,
      color: "var(--muted-foreground)",
      fontSize: "14px",
    }),
    singleValue: (base) => ({
      ...base,
      margin: 0,
      color: "var(--foreground)",
      fontSize: "14px",
      fontWeight: "500",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      paddingRight: "8px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "4px",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--surface)",
      borderRadius: "16px",
      border: "1px solid var(--border)",
      boxShadow:
        "0 12px 32px -4px rgba(21, 22, 25, 0.12), 0 4px 12px -2px rgba(21, 22, 25, 0.06)",
      overflow: "hidden",
      marginTop: "6px",
      marginBottom: "6px",
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "300px", // Around 280–320px
      padding: "6px",
      backgroundColor: "var(--surface)",
      overflowY: "auto",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999, // Above modal/card overflow containers
    }),
    noOptionsMessage: (base) => ({
      ...base,
      fontSize: "13px",
      color: "var(--muted-foreground)",
      padding: "12px",
    }),
  };

  return (
    <div className="relative flex items-center w-full">
      {/* Globe Icon */}
      <Globe
        className="absolute left-4 h-5 w-5 text-[var(--muted-foreground)] pointer-events-none z-10"
        aria-hidden="true"
      />

      <div className="w-full">
        <Select<CountryOption, false>
          instanceId="home-country-select"
          inputId="country-select"
          name="homeCountry"
          isDisabled={disabled}
          isSearchable={true}
          isClearable={false}
          value={selectedOption}
          onChange={(opt) => onChange(opt ? opt.value : "")}
          options={COUNTRY_OPTIONS}
          placeholder="Select your home country"
          menuPosition="fixed"
          menuShouldScrollIntoView={false}
          menuPortalTarget={isMounted && typeof document !== "undefined" ? document.body : undefined}
          components={{
            DropdownIndicator: CustomDropdownIndicator,
            Option: CustomOption,
          }}
          styles={customStyles}
          aria-label="Home country"
          aria-invalid={hasError}
          aria-describedby={hasError && errorMessageId ? errorMessageId : undefined}
        />
      </div>
    </div>
  );
}
