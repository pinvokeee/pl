import { PLObject } from "./types";

export const test_plobj : PLObject = {
    
    employeeData: {

        pattern: [
            {
                id: "test_cm",
                category: "CM",
                layer: "CM",
                variant: "",
            },

            {
                id: "test_ld",
                category: "管理者",
                layer: "LD",
                variant: "",
            },

            {
                id: "test_sv",
                category: "管理者",
                layer: "SV",
                variant: "",
            }
        ],

        rates: {
            revenue: [
                {
                    employeePatternId: "test_cm",
                    amount: 2000,
                    overtimeRate: 1.25,
                },

                {
                    employeePatternId: "test_ld",
                    amount: 2650,
                    overtimeRate: 1.25,
                },

                {
                    employeePatternId: "test_sv",
                    amount: 3000,
                    overtimeRate: 1.25,
                }
            ],

            cost: [
                {
                    employeePatternId: "test_cm",
                    amount: 1150,
                    overtimeRate: 1.25,
                },

                {
                    employeePatternId: "test_ld",
                    amount: 1440,
                    overtimeRate: 1.25,
                },

                {
                    employeePatternId: "test_sv",
                    amount: 1440,
                    overtimeRate: 1.25,
                }
            ]
        },

        result: {
            
            revenue: {
                forcast: [],
                actual: []
            },

            cost: {
                forcast: [],
                actual: []
            }
        }
    },

    revenueItems: []
}